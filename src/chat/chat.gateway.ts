import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { OnModuleInit, UseFilters, UsePipes } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { WsExceptionFilter } from 'src/filters/ws-exception.filter';
import { JoinChatDto } from './dto/join-chat.dto';
import { WsParseJsonPipe } from 'src/pipies/ws-parse-json.pipe';
import { WsValidateMessagePipe } from 'src/pipies/ws-validate-message.pipe';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(WsExceptionFilter)
export class ChatGateway implements OnModuleInit {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService
  ) { }
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected ${socket.id}`);
    })
  }

  @UsePipes(WsParseJsonPipe)
  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    const { userName, roomName } = payload;
    client.emit('userJoined', { userName });
    
    if (!userName) {
      throw new WsException('Set userName');
    }
    if (!roomName) {
      throw new WsException('Set roomName');
    }

    let chat = await this.chatService.getChatByName(roomName);
    if (!chat) {
      throw new WsException('Not found chat');
    }
    console.log(chat)

    client.join(roomName);
    this.server.to(roomName).emit('onMessage', `${userName} joined the chat ${roomName}`)
  }

  @UsePipes(WsParseJsonPipe)
  @SubscribeMessage('leaveChat')
  async handleLeaveChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    const { userName, roomName } = payload;
    client.emit('userLeave', { userName });

    let chat = await this.chatService.getChatByName(roomName);
    if (!chat) {
      throw new WsException('Not found chat');
    }
    this.server.to(roomName).emit('onMessage', `${userName} leaves the chat ${roomName}`)
    client.leave(roomName);
  }

  @UsePipes(WsParseJsonPipe)
  @SubscribeMessage('newMessage')
  onNewMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateMessageDto) {
    const { userName, roomName } = payload;
    if (!userName) {
      throw new WsException('Set userName');
    }
    if (!roomName) {
      throw new WsException('Set roomName');
    }
    if (!client.rooms.has(roomName)) {
      throw new WsException('You should connect to the chat');
    }
    const message = {
      ...payload, 
      date: new Date().toISOString(),
    };
    this.messageService.createMessage(message)
    this.server.to(payload.roomName).emit('onMessage', message)
  }

  @UsePipes(WsParseJsonPipe)
  @SubscribeMessage('createChat')
  async createChat(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateChatDto) {
    const { name } = payload;
    let chat = await this.chatService.getChatByName(name);
    if (chat) {
      throw new WsException('A chat with that name already exists');
    }
    chat = await this.chatService.createChat({ name: name }); 
    this.server.emit('onMessage', chat)
  }

  @SubscribeMessage('getChats')
  async getChats() {
    const chats = await this.chatService.getAllChats();
    this.server.emit('onMessage', chats)
  }
}

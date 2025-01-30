import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/chat/dto/create-message.dto';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly chatService: ChatService,
  ) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<Message | null> {
    const chat = await this.chatService.getChatByName(
      createMessageDto.roomName,
    );

    const newMessage = this.messageRepository.create({
      ...createMessageDto,
      chatId: chat.id,
    });

    return await this.messageRepository.save(newMessage);
  }
}

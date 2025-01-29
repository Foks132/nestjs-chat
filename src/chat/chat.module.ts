import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  providers: [ChatGateway, ChatService, MessageService],
})
export class ChatModule { }

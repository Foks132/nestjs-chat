import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatService } from 'src/chat/chat.service';

@Module({
  controllers: [MessageController],
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  providers: [MessageService, ChatService],
  exports: [MessageService],
})
export class MessageModule {}

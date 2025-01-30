import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = this.chatRepository.create(createChatDto);
    return await this.chatRepository.save(chat);
  }

  async getAllChats(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  async getChatByName(name: string): Promise<Chat | null> {
    return this.chatRepository.findOne({ where: { name } });
  }
}

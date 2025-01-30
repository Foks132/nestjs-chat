import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JoinChatDto } from './dto/join-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('WebSocket Chat')
@Controller('chat')
export class ChatController {
  @Post('joinChat')
  @ApiOperation({ summary: 'Подключение к чату (WebSocket)' })
  @ApiBody({ type: JoinChatDto })
  @ApiResponse({ status: 101, description: 'Switching Protocols' })
  joinChat(@Body() payload: JoinChatDto) {
    return { event: 'joinChat', payload };
  }

  @Post('leaveChat')
  @ApiOperation({ summary: 'Покинуть чат (WebSocket)' })
  @ApiBody({ type: JoinChatDto })
  @ApiResponse({ status: 101, description: 'Switching Protocols' })
  leaveChat(@Body() payload: JoinChatDto) {
    return { event: 'leaveChat', payload };
  }

  @Post('newMessage')
  @ApiOperation({ summary: 'Отправка сообщения в чат (WebSocket)' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 101, description: 'Switching Protocols' })
  sendMessage(@Body() payload: CreateMessageDto) {
    return { event: 'newMessage', payload };
  }

  @Post('createChat')
  @ApiOperation({ summary: 'Создание чата (WebSocket)' })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: 101, description: 'Switching Protocols' })
  createChat(@Body() payload: CreateChatDto) {
    return { event: 'createChat', payload };
  }

  @Get('getChats')
  @ApiOperation({ summary: 'Получение списка чатов (WebSocket)' })
  @ApiResponse({
    status: 101,
    description: 'Switching Protocols',
    type: [String],
  })
  getRooms() {
    return { event: 'getChats', chats: [] };
  }
}

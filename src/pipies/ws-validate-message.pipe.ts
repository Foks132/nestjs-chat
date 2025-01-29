import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { CreateMessageDto } from 'src/chat/dto/create-message.dto';
import { JoinChatDto } from 'src/chat/dto/join-chat.dto';

@Injectable()
export class WsValidateMessagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value)
    const { userName, roomName } = value;
    if (!userName) {
        console.log(userName)
      throw new WsException('Username is required');
    }
    if (!roomName) {
      throw new WsException('RoomName is required');
    }
    return value;
  }
}

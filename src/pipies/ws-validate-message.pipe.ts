import { PipeTransform, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsValidateMessagePipe implements PipeTransform {
  transform(value: any) {
    if (value instanceof Socket) {
      return value;
    }
    const { userName, roomName } = value;
    if (!userName) {
      throw new WsException('Username is required');
    }
    if (!roomName) {
      throw new WsException('RoomName is required');
    }
    return value;
  }
}

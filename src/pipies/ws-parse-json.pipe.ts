import { PipeTransform, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsParseJsonPipe implements PipeTransform {
  transform(value: any) {
    if (value instanceof Socket) {
      return value;
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch (error) {
        throw new WsException(error);
      }
    }
    return value;
  }
}

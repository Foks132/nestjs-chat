import { PipeTransform, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsParseJsonPipe implements PipeTransform {
    transform(value: any) {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (error) {
                throw new WsException('Invalid JSON format');
            }
        }
        return value;
    }
}

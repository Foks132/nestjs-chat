import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WsExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException | WsException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    const errorResponse = this.formatError(exception);

    console.error('WebSocket Error:', errorResponse);
    client.emit('error', errorResponse);
  }

  private formatError(exception: HttpException | WsException) {
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception.getResponse(),
        type: 'HttpException',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: exception.message || 'WebSocket Exception',
        type: 'WsException',
      };
    }
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinChatDto {
  @ApiProperty({ example: 'user', description: 'Имя пользователя' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'exampleChat', description: 'Название чата' })
  @IsNotEmpty()
  @IsString()
  roomName: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'exampleChat', description: 'Название чата' })
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @ApiProperty({ example: 'user', description: 'Имя отправителя' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'Example message text',
    description: 'Текст сообщения',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

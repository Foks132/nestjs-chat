import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'exampleChat', description: 'Название чата' })
  name: string;
}

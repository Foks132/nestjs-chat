import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Chat } from '../../chat/entities/chat.entity';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  message: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @Type(() => Date)
  @IsOptional()
  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt?: Date;

  @Type(() => Chat)
  @IsOptional()
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat?: Chat;

  @IsOptional()
  @RelationId((message: Message) => message.chat)
  @Column()
  chatId?: number;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../../message/entities/message.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  name: string;

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'transaction' })
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  user: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'float' })
  distance: number;

  @CreateDateColumn()
  createdAt: Date;
}

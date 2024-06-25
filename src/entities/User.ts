import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

}
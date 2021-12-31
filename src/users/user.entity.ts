import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

type UserResponse = {
  id: number;
  username: string;
  role: string;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole;

  responseFormat(): UserResponse {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
    };
  }
}

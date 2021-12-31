import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(findUserOptions: Partial<User>): Promise<User> {
    return this.usersRepository.findOne(findUserOptions);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  delete(user: User): Promise<DeleteResult> {
    return this.usersRepository.delete(user);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(findUserOptions: Partial<User>): Promise<User> {
    const user = this.usersRepository.findOne(findUserOptions);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async upsert(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  delete(user: User): Promise<DeleteResult> {
    return this.usersRepository.delete(user);
  }
}

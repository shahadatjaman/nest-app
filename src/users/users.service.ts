import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      fullname : 'John Smith',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      fullname : 'আবু জাফর ',
      username: 'jafor',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
};
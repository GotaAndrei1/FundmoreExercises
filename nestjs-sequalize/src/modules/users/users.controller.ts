import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOneById(id);
  }
}

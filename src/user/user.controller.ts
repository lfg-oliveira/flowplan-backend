import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/create-user-dto/create-user-dto.interface';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

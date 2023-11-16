import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/create-user-dto/create-user-dto.interface';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    @Post('login')
    async login(@Body() loginDto: Pick<CreateUserDto, 'email' | 'password'>) {
        await this.usersService.login(loginDto);
        return { status: 'Login succesful' };
    }
}

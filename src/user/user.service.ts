import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/create-user-dto/create-user-dto.interface';
import argon2 from 'argon2';
const prisma = new PrismaClient();
@Injectable()
export class UserService {
    async create(user: CreateUserDto) {
        await prisma.user.create({
            data: {
                email: user.email,
                password: await argon2.hash(user.password),
            },
        });
    }

    async login(user: Pick<CreateUserDto, 'email' | 'password'>) {
        const userFound = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        const passwordMatch = await argon2.verify(
            userFound.password,
            user.password,
        );
        if (!passwordMatch) {
            throw new BadRequestException(
                'Nome de usuário ou senha incorreta. Tente novamente.',
            );
        }
        return userFound;
    }
}

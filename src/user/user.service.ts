import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/create-user-dto/create-user-dto.interface';
import * as argon2 from 'argon2';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
    async createJWT(uid: number) {
        return await new SignJWT({
            uid,
        })
            .setExpirationTime('10m')
            .setIssuedAt(Date.now())
            .setProtectedHeader({
                alg: "HS256",
                
            })
            .sign(Buffer.from(process.env.JWT_SECRET));
    }

    async create(user: CreateUserDto) {
        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                password: await argon2.hash(user.password),
            },
        });

        return await this.createJWT(createdUser.id);
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
        // Create JWT
        const token = this.createJWT(userFound.id);
        return await token;
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatusService {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = new PrismaClient();
    }

    async createStatus(status: { [key: string]: any }) {
        await this.prisma.status.create({
            data: {
                name: status.name,
                Task: { connect: { id: status.taskId } },
                workspace: { connect: { id: status.wsId } },
            },
        });
    }

    async deleteStatus(id: number) {
        await this.prisma.status.delete({
            where: {
                id: id,
            },
        });
    }

    async getStatus(id: number) {
        return await this.prisma.status.findUnique({
            where: {
                id: id,
            },
        });
    }

    async updateStatus(id: number, status: { [key: string]: any }) {
        await this.prisma.status.update({
            where: {
                id: id,
            },
            data: {
                name: status.name,
                Task: { connect: { id: status.taskId } },
                workspace: { connect: { id: status.wsId } },
            },
        });
    }
}

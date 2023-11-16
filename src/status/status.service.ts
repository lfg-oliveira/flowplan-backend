import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class StatusService {
    async createStatus(status: { [key: string]: any }) {
        await prisma.status.create({
            data: {
                name: status.name,
                Task: { connect: { id: status.taskId } },
                workspace: { connect: { id: status.wsId } },
            },
        });
    }

    async deleteStatus(id: number) {
        await prisma.status.delete({
            where: {
                id: id,
            },
        });
    }

    async getStatus(id: number) {
        return await prisma.status.findUnique({
            where: {
                id: id,
            },
        });
    }

    async getStatusesByWorkspace(wsId: number) {
        return await prisma.status.findMany({
            where: {
                workspaceId: wsId,
            },
        });
    }
    async updateStatus(id: number, status: { [key: string]: any }) {
        await prisma.status.update({
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

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class WorkspaceService {
    async createWorkspace(workspace: { [key: string]: any }) {
        await prisma.workspace.create({
            data: {
                name: workspace.name,
                status: workspace.status,
                ownerId: workspace.ownerId,
            },
        });
    }

    async deleteWorkspace(id: number) {
        await prisma.workspace.delete({
            where: {
                id: id,
            },
        });
    }

    async getWorkspace(id: number) {
        return await prisma.workspace.findUnique({
            where: {
                id: id,
            },
        });
    }

    async updateWorkspace(id: number, workspace: { [key: string]: any }) {
        await prisma.workspace.update({
            where: {
                id: id,
            },
            data: {
                name: workspace.name,
                status: workspace.status,
                ownerId: workspace.ownerId,
            },
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from 'src/create-task-dto/create-task-dto.interface';
const prisma = new PrismaClient();

@Injectable()
export class TaskService {
    async createTask(task: CreateTaskDto) {
        const createData: Omit<CreateTaskDto, 'statusId' | 'wsId'> = task;
        await prisma.task.create({
            data: {
                ...createData,
                status: { connect: { id: task.statusId } },
                ws: { connect: { id: task.wsId } },
            },
        });
    }

    async deleteTask(id: number) {
        await prisma.task.delete({
            where: {
                id: id,
            },
        });
    }

    async getTask(id: number) {
        return await prisma.task.findUnique({
            where: {
                id: id,
            },
        });
    }

    async getTasksByStatus(statusId: number) {
        return await prisma.task.findMany({
            where: {
                statusId: statusId,
            },
        });
    }
    async updateTask(id: number, task: { [key: string]: any }) {
        await prisma.task.update({
            where: {
                id: id,
            },
            data: {
                title: task.name,
                description: task.description,
                status: { connect: { id: task.statusId } },
                ws: { connect: { id: task.wsId } },
            },
        });
    }

    async getTasksByWorkspace(id: number) {
        return await prisma.task.findMany({
            where: {
                wsId: id,
            },
        });
    }
}

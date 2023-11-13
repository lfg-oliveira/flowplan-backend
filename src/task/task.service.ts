import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from 'src/create-task-dto/create-task-dto.interface';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async createTask(task: CreateTaskDto) {
    const createData: Omit<CreateTaskDto, 'statusId' | 'wsId'> = task;
    await this.prisma.task.create({
      data: {
        ...createData,
        status: { connect: { id: task.statusId } },
        ws: { connect: { id: task.wsId } },
      },
    });
  }

  async deleteTask(id: number) {
    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }

  async getTask(id: number) {
    return await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateTask(id: number, task: { [key: string]: any }) {
    await this.prisma.task.update({
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
    return await this.prisma.task.findMany({
      where: {
        wsId: id,
      },
    });
  }
}

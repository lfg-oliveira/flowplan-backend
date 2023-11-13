import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async createWorkspace(workspace: { [key: string]: any }) {
    await this.prisma.workspace.create({
      data: {
        name: workspace.name,
        status: workspace.status,
        ownerId: workspace.ownerId,
      },
    });
  }

  async deleteWorkspace(id: number) {
    await this.prisma.workspace.delete({
      where: {
        id: id,
      },
    });
  }

  async getWorkspace(id: number) {
    return await this.prisma.workspace.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateWorkspace(id: number, workspace: { [key: string]: any }) {
    await this.prisma.workspace.update({
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

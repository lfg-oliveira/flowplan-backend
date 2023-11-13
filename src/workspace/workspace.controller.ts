import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private wsService: WorkspaceService) {}
  @Post()
  async createWorkspace(@Body() workspace: { [key: string]: any }): Promise<{
    status: string;
  }> {
    await this.wsService.createWorkspace(workspace);
    return { status: 'Workspace created' };
  }

  @Delete(':id')
  async deleteWorkspace(@Param('id') id: number): Promise<{ status: string }> {
    await this.wsService.deleteWorkspace(id);
    return { status: 'Workspace deleted' };
  }

  @Get(':id')
  async getWorkspace(@Param('id') id: number): Promise<{ status: string }> {
    await this.wsService.getWorkspace(id);
    return { status: 'Workspace found' };
  }

  @Put(':id')
  async updateWorkspace(
    @Param('id') id: number,
    @Body() data: { [key: string]: any },
  ): Promise<{ status: string }> {
    await this.wsService.updateWorkspace(id, data);
    return { status: 'Workspace updated' };
  }
}

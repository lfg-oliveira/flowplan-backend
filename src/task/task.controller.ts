import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/create-task-dto/create-task-dto.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(@Body() task: CreateTaskDto): Promise<{ status: string }> {
        await this.taskService.createTask(task);
        return { status: 'Task created' };
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<{ status: string }> {
        await this.taskService.deleteTask(id);
        return { status: 'Task deleted' };
    }

    @Get(':id')
    async getTask(@Param('id') id: number): Promise<{ status: string }> {
        await this.taskService.getTask(id);
        return { status: 'Task found' };
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: number,
        @Body() data: { [key: string]: any },
    ): Promise<{ status: string }> {
        await this.taskService.updateTask(id, data);
        return { status: 'Task updated' };
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post()
    async createStatus(
        @Body() status: { [key: string]: any },
    ): Promise<{ status: string }> {
        await this.statusService.createStatus(status);
        return { status: 'Status created' };
    }

    @Delete(':id')
    async deleteStatus(@Param('id') id: number): Promise<{ status: string }> {
        await this.statusService.deleteStatus(id);
        return { status: 'Status deleted' };
    }

    @Get(':id')
    async getStatus(@Param('id') id: number): Promise<{ status: string }> {
        await this.statusService.getStatus(id);
        return { status: 'Status found' };
    }

    @Put(':id')
    async updateStatus(
        @Param('id') id: number,
        @Body() data: { [key: string]: any },
    ): Promise<{ status: string }> {
        await this.statusService.updateStatus(id, data);
        return { status: 'Status updated' };
    }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceService } from './workspace/workspace.service';
import { WorkspaceController } from './workspace/workspace.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/TaskService';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    WorkspaceController,
    UserController,
    TaskController,
    StatusController,
  ],
  providers: [AppService, WorkspaceService, UserService, TaskService, StatusService],
})
export class AppModule {}

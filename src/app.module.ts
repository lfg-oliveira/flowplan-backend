import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceService } from './workspace/workspace.service';
import { WorkspaceController } from './workspace/workspace.controller';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';

@Module({
    imports: [ConfigModule.forRoot(), UserModule],
    controllers: [
        AppController,
        WorkspaceController,
        TaskController,
        StatusController,
    ],
    providers: [AppService, WorkspaceService, TaskService, StatusService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes(WorkspaceController, TaskController, StatusController);
    }
}

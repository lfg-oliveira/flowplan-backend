import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceController } from './workspace.controller';

describe('WorkspaceController', () => {
  let controller: WorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceController],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new workspace', () => {
    expect(controller.createWorkspace()).toBe({ status: 'Workspace created' });
  });

  it('should delete workspace', () => {
    expect(controller.deleteWorkspace()).toBe({ status: 'Workspace deleted' });
  });

  it('should get workspace', () => {
    expect(controller.getWorkspace()).toBe({ status: 'Workspace found' });
  });

  it('should update workspace', () => {
    expect(controller.updateWorkspace()).toBe({ status: 'Workspace updated' });
  });
});

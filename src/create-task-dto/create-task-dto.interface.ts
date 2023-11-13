export interface CreateTaskDto {
    readonly title: string;
    readonly status: string;
    readonly description?: string;
    readonly wsId: number;
    readonly statusId: number;
}

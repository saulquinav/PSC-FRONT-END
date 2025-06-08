export enum DocumentPermissionType
{
    READ = "READ",
    WRITE = "WRITE"
}

export interface DocumentPermissionDTO
{
    userId: number;
    documentId: number;

    name: string;
    permissionType: DocumentPermissionType;
}
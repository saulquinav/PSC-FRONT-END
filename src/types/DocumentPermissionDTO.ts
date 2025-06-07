export interface DocumentPermissionDTO {
  userId?: number;
  documentId?: number;
  name?: string;
  //userEntity?: UserEntity;
  //fileMetadata?: DocumentEntity;
  //permissionType?: DocumentPermissionType;
  filePassword?: string;
}
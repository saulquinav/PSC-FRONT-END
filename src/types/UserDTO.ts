interface UserDTO {
  id?: number;
  username: string;
  password: string;
  documentPermissions?: DocumentPermissionDTO[];
}
import { DocumentPermissionDTO } from "./DocumentPermissionDTO";

export interface UserDTO {
  id?: number;
  username: string;
  password: string;
  documentPermissions?: DocumentPermissionDTO[];
}
import { DocumentPermissionDTO } from "./DocumentPermissionDTO";

export interface DocumentDTO {
  id?: number;
  name: string;
  data: number[]; // byte[] as Uint8Array or number[]
  documentPermissions?: DocumentPermissionDTO[];
}
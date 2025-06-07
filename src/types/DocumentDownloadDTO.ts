import { DocumentPermissionDTO } from "./DocumentPermissionDTO";

export interface DocumentDownloadDTO {
  id: number;
  name: string;
  data: number[]; // byte[] as Uint8Array or number[]
  documentPermissions?: DocumentPermissionDTO[];
  size: number;
  uploadDate: string;
}
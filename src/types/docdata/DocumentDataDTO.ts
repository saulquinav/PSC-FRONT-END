export interface DocumentDataDTO {
    id: number;
    // We use JSON to send files to the back-end, so a base64-encoded 'string' is
    // the recomended representation of a file
    data: string; // base64-encoded file content
}
export enum InventoryAction
{
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

export interface InventotyLogDTO
{
    id: number;
    action: InventoryAction; // CREATE, UPDATE, DELETE
    quantityChange: number;
    note: string;
}
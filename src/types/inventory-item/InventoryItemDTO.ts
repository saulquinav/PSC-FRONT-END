export enum ItemType
{
    CPU = "CPU",
    GPU = "GPU",
    MOTHERBOARD = "MOTHERBOARD",
    RAM = "RAM",
    SSD = "SSD",
    HDD = "HDD",
    POWER_SUPPLY = "POWER_SUPPLY",
    CASE = "CASE",
    COOLER = "COOLER",
    OTHER = "OTHER"
}

export interface InventoryItemDTO
{
    id: number;
    name: string;
    itemType: ItemType;
    brand: string;
    model: string;
    quantity: number;
}
import axios from 'axios';

export class CrudService<T> {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetchAll(): Promise<T[]> {
        const response = await axios.get<T[]>(this.baseUrl);
        return response.data;
    }

    async fetchById(id: number): Promise<T> {
        const response = await axios.get<T>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async create(dto: Omit<T, 'id'>): Promise<T> {
        const response = await axios.post<T>(this.baseUrl, dto);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async update(dto: T): Promise<T> {
        const response = await axios.put<T>(`${this.baseUrl}/${(dto as any).id}`, dto);
        return response.data;
    }
}
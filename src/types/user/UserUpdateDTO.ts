// User DTO for updating an existing User Entity from the back-end database

export interface UserUpdateDTO
{
    id: number;
    username: string;
    password: string;
}
// User DTO for updating an existing User Entity from the back-end database

export interface UserPasswordUpdateDTO {
    id: number;
    oldPassword: string;
    newPassword: string;
}
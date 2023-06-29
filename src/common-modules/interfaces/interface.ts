export interface JwtUserData {
    email: string;
    role: Role
}

export enum Role {
    USER = 'user',
    DOCTOR = 'doctor',
    ADMIN = 'admin'
}
export interface JwtUserData {
    email: string;
    role: Role
}

export enum Role {
    USER = 'user',
    DOCTOR = 'doctor',
    ADMIN = 'admin'
}

export interface User {
    username: string,
    password?: string,
    nume: string,
    prenume: string,
    telefon: string,
    role: string
}

export enum DialogAction {
    Delete = 'stergi',
    Reschedule = 'reprogramezi',
}

export enum Resource {
    Appointment = 'programare',
    Product = 'produs'
}
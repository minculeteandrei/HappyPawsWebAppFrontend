export interface Appointment {
    id: number;
    animal: Animal;
    animal_name: string,
    date: Date;
    description: string
}

export enum Animal {
    CAT = 'Pisica',
    DOG = 'Caine'
}
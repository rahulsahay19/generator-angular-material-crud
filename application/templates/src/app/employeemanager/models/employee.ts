import { Note } from './note';

export class Employee {
    id: number;
    birthDate: Date;
    name: string;
    avatar: string;
    bio:string;

    notes: Note[] = [];
}

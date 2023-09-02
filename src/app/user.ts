import { DocumentData } from 'firebase/firestore';
export interface User extends DocumentData {
    uid: number;
    email: string;
    photoURL?: string;
    organisation: string ;
    role: string ;
    team?: number;
    cinemas?:any[];
}

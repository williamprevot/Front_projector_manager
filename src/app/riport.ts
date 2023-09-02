export interface Riport {
    reportId: string;
    cinema: string;
    projector: string;
    date: Date;
    type: 'reparation' | 'maintenance';        
    message: string;
    responsible: number;
}

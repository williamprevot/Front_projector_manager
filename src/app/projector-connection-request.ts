export interface ProjectorConnectionRequest {
    projectorId: string;
    cinemaId: string;
    model: string;
    status: String,
    timestamp: Date,
    status_history: [{ status: String, timestamp: Date }] 
}

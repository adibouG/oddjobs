export enum MissionStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    WAITING = 'WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    WAITING_VALIDATION = 'WAITING_VALIDATION',
    FAILED = 'FAILED',
    ACCEPTED = 'ACCEPTED',
    WAITING_PAYMENT = 'WAITING_PAYMENT', 
    WAITING_RESOLUTION = 'WAITING_RESOLUTION', 
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    ARCHIVED = 'ARCHIVED'
}

export enum MissionType {
    OWNED = 'OWNED',
    MANAGED = 'MANAGED',
    MISSION_GROUP = 'MISSION_GROUP'
}


export class Mission {
    _id? : string ;
    title: string;
    description: string;
    creator:  string = '';
    executor: string = '';
    status: MissionStatus = MissionStatus.DRAFT;
    type: MissionType = MissionType.OWNED;
    reward: number | string = 0;

    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    timeLimitAt: Date = new Date(this.createdAt.setDate(this.createdAt.getDate() + 7)); // 7 days from
    startAt?: Date ; // 7 days from



    constructor(title: string, description: string) {
        
        this.title = title;
        this.description = description;

    }



}
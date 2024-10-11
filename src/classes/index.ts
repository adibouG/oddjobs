import { User } from './User';
import { Mission } from './Mission';

export { User, Mission };

export class Message {
    constructor(message: string) {
        this.message = message;
    }
    id: number = 0;
    message: string;
    from: number=   0 
    to: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()    

}

export enum ChatRoomStatus {
    UNACTIVE = 'UNACTIVE',
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED',
    DELETED = 'DELETED'
}
export enum ChatRoomType {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
    GROUP = 'GROUP',
    DIRECT = 'DIRECT'   

}

export class ChatRoom {
    constructor(name: string) {
        this.name = name;
    }
    id: number = 0;
    name: string;
    messages: number[] = [];
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    status: ChatRoomStatus = ChatRoomStatus.UNACTIVE
    type: ChatRoomType = ChatRoomType.PRIVATE
    users: number[] = []
    
}
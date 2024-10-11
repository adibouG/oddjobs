export  enum UserStatus {

    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    BANNED = 'BANNED'

}

export enum UserActivityStatus {
    ALLOWED = 'ALLOWED',
    WAITING = 'WAITING', 
    BUSY = 'BUSY',

}
interface Users {
    _id : string  ;
     username: string ;
     avatar?: string ;
     status?: string ;
    role?: string;
}
export class User implements Users {
     _id : string = '';
     username: string = '';
     avatar?: string ;
     status?: string ;
    role?: string;
    // activityStatus: UserActivityStatus = UserActivityStatus.WAITING;
    

    // createdAt?: number = Date.now();
    // updatedAt?: number  =  Date.now();



    constructor( {_id, username, avatar, status, role}: Users) {
        this._id = _id;
        this.username = username;
        this.avatar = avatar;
        this.status = status;
        this.role = role;
    }



}




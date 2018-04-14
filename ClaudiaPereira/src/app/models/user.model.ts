export interface IUser {
    uid:string;
    email: string;
    login: string;
    roles: Roles;
}
export interface IRoles {
    id: string;
    name: string; 
}
export class User implements IUser {
    constructor(public uid:string, public email:string, public login:string, public roles:Roles) {
        this.email          = email
        this.uid            = uid
        this.login          = login
        this.roles          = roles
    }
}
export class Roles implements IRoles {
    constructor(public id:string, public name:string) {
        this.id     = id
        this.name   = name
    }
}
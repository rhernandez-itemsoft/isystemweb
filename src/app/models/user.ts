import { Role } from './role';


export class User {
    id: number;
    firstname: string;
    lastname: string;
    mlastname: string;
    email: string;
    username: string;
    password: string;
    roles: Array<Role>;
    token?: string;
}

export class LogIn {
    email: string;
    username: string;
    password: string;
}

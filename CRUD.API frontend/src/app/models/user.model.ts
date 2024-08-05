export interface Users {
    result:       User[];
    statusCode:   number;
    errorMessage: string;
}

export interface User {
    
    id:   number;
    name: string;
    password: string;
    isActive: boolean;
}

export interface AllUsers {
    result:       AllUser[];
    statusCode:   number;
    errorMessage: string;
}

export interface AllUser {
    id:   number;
    name: string;
    isActive: boolean;
}

export interface AddUsers {
    result:       AddUser[];
    statusCode:   number;
    errorMessage: string;
}

export interface AddUser {
    //id:   number;
    name: string;
    password: string;
    isactive: boolean;
}


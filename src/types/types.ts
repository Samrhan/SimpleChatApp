export interface User {
    id: string;
    username: string;
}

export interface Room {
    id: string;
    name: string;
}

export interface Message {
    id: string;
    user: User;
    content: string;
    createdAt: string;
    updatedAt: string;
}
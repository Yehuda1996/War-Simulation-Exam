export interface User {
    _id: string,
    username: string,
    password: string,
    organization: string,
    area?: string
}

export interface Resource {
    name: string;
    amount: number;
}

export interface Organization {
    _id: string; 
    name: string;
    resources: Resource[]; 
    budget: number;
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected";
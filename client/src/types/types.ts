export interface User {
    _id: string,
    username: string,
    password: string,
    organization: string,
    area?: string
}

export interface Organization {
    _id: string,
    name: string,
    recources: [Object]
    budget: number
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected";
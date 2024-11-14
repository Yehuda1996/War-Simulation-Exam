export interface User {
    _id: string,
    username: string,
    password: string,
    organization: string,
    area?: string
}
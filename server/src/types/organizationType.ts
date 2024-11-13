export interface Resource {
    name: string; 
    amount: number; 
}

export interface Organization {
    name: string; 
    resources: Resource[]; 
    budget: number; 
}
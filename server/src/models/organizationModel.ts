import mongoose, { Schema, Document } from "mongoose";

interface IResource {
    name: string;
    amount: number;
}

export interface IOrganization extends Document {
    name: string;
    resources: IResource[];
    budget: number;
}

const ResourceSchema = new Schema<IResource>({
    name: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
});

const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, 
        required: true, 
        unique: true 
    },
    resources: { 
        type: [ResourceSchema], 
        required: true 
    },
    budget: { 
        type: Number, 
        required: true 
    }
});

export default mongoose.model<IOrganization>("Organization", OrganizationSchema);

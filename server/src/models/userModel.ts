import mongoose, {Schema, Types} from "mongoose";

enum Organization{
    idf = 'IDF',
    hezbollah = "Hezbollah",
    hamas = "Hamas",
    ircg = "IRCG",
    houthis = "Houthis"
}

enum Area {
    north = "North",
    south = "South",
    center = "Center",
    westBank = "West Bank"
}

export interface IUser extends Document {
    username: string,
    password: string,
    organization: Organization,
    area?: Area
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    organization: {
        type: String,
        enum: Object.values(Organization),
        required: true
    },
    area: {
        type: String,
        enum: Object.values(Area)
    }
})

export default mongoose.model<IUser>("User", UserSchema);
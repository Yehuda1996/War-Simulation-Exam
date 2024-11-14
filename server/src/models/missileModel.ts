import mongoose, {Schema} from 'mongoose';

export interface IMissle extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number
}

const missileSchema = new Schema<IMissle>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
  },
  intercepts: {
    type: [String],
    default: [], 
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model<IMissle>('Missile', missileSchema);


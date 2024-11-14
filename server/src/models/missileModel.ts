import mongoose from 'mongoose';

const missileSchema = new mongoose.Schema({
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

const Missile = mongoose.model('Missile', missileSchema);

export default Missile;

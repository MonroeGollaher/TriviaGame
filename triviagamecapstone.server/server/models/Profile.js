import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    currentPoints: { type: Number, default: 0 },
    gameScores: [{ type: Number }]
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Profile

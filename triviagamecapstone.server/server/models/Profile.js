import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    currentGame: { type: ObjectId, ref: 'Game' },
    currentPoints: { type: Number, default: 0 },
    gameScores: [{ type: Number }],
    // @ts-ignore
    teamName: { type: String, default: this.name },
    roomPin: { type: String }
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Profile

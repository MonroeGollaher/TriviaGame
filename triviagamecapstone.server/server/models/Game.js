import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Game = new Schema(
  {
    title: { type: String, required: true },
    numberOfQuestions: { type: Number, required: true },
    creatorId: { type: String, ref: 'Profile', required: true },
    roomPin: { type: String, required: true },
    activeQuestion: { type: Object }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

// NOTE virtual for creator property of host, allows FE to populate the profile properties(name, email, currentpoints)
Game.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
export default Game

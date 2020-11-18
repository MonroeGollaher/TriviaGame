import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Game = new Schema(
  {
    title: { type: String, required: true },
    numberOfQuestions: { type: Number, required: true },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

Game.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
export default Game

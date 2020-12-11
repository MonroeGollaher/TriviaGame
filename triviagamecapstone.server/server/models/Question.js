import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Question = new Schema(
  {
    category: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    wrongAnswers: { type: Array, required: true },
    gameId: { type: ObjectId, ref: 'Game', required: true }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

export default Question

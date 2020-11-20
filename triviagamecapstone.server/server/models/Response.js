import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Response = new Schema(
  {
    teamId: { type: ObjectId, ref: 'Profile', required: true },
    questionId: { type: ObjectId, ref: 'Question', required: true },
    approved: { type: Boolean, required: true },
    wager: { type: Number, required: true },
    answer: { type: String, required: true }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

export default Response

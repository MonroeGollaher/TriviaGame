import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import GameSchema from '../models/Game'
import QuestionSchema from '../models/Question'
import ResponseSchema from '../models/Response'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Games = mongoose.model('Game', GameSchema);
  Questions = mongoose.model('Question', QuestionSchema)

  Responses = mongoose.model('Response', ResponseSchema)
}

export const dbContext = new DbContext()

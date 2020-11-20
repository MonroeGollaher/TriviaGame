import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import GameSchema from '../models/Game'
import QuestionSchema from '../models/Question'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Games = mongoose.model('Game', GameSchema);
  Questions = mongoose.model('Question', QuestionSchema)
}

export const dbContext = new DbContext()

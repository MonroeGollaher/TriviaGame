import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import GameSchema from '../models/Game'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Games = mongoose.model('Game', GameSchema)
}

export const dbContext = new DbContext()

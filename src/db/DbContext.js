import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CarSchema } from '../models/Car.js';
import { HouseSchema } from '../models/House.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  // NOTE when setting up these contexts
  // ⬇️ this is how you will reference the collection in your code
  //                       ⬇️ this is how MongoDB names it in collections
  Cars = mongoose.model('car', CarSchema);
  Houses = mongoose.model('house', HouseSchema);
}

export const dbContext = new DbContext()

import { Document } from 'camo';
import { runModelQueryActionWithDeepPopulate } from 'util';
import Event from './Event';

export default class Tournament extends Document {
  askfredId = {
    type: String,
    required: true,
    unique: true,
  };
  name = String;
  events = [Event];

  static find(query, options) {
    const action = (...x) => super.find(...x);
    return runModelQueryActionWithDeepPopulate(action, query, options);
  }

  static findOne(query, options) {
    const action = (...x) => super.findOne(...x);
    return runModelQueryActionWithDeepPopulate(action, query, options);
  }
}

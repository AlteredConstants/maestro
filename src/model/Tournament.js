import { Document } from 'camo';
import Event from './Event';

export default class Tournament extends Document {
  askfredId = {
    type: String,
    required: true,
    unique: true,
  };
  name = String;
  events = [Event];
}

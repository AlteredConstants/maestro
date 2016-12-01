import { Document } from 'camo';
import Fencer from './Fencer';

export default class Event extends Document {
  askfredId = {
    type: String,
    required: true,
    unique: true,
  };
  askfredTournamentId = {
    type: String,
    required: true,
  }
  description = String;
  weapon = {
    type: String,
    choices: ['epee', 'foil', 'saber'],
  }
  date = Date;
  preregisteredFencers = [Fencer];
}

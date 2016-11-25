import { Document, EmbeddedDocument } from 'camo';

class Rating extends EmbeddedDocument {
  letter = String;
  year = Number;
}

class Ratings extends EmbeddedDocument {
  epee = Rating;
  foil = Rating;
  saber = Rating;
}

export default class Fencer extends Document {
  askfredId = String;
  firstName = String;
  lastName = String;
  birthYear = Number;
  gender = {
    type: String,
    choices: ['M', 'W'],
  }
  usfaId = String;
  rating = Ratings;
}

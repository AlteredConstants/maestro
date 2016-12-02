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
  askfredId = {
    type: String,
    // TODO: Needs 'sparse' also to allow NULL value.
    // unique: true,
  };
  firstName = String;
  lastName = String;
  birthYear = Number;
  gender = {
    type: String,
    choices: ['M', 'W', undefined],
  }
  usfaId = String;
  rating = Ratings;
}

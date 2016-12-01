import Model from 'model/Model';

let superAwesomeGlobalIdCounter = 0;

export default class Bout extends Model {
  constructor({ rightFencer, leftFencer }) {
    super();
    this.id = superAwesomeGlobalIdCounter;
    superAwesomeGlobalIdCounter += 1;
    this.rightFencer = rightFencer;
    this.leftFencer = leftFencer;
  }
}

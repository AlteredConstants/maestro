import Fencer from 'model/Fencer';

export default class Opponent extends Fencer {
  constructor({ seed, ...props }) {
    super(props);
    this.seed = seed;
  }
}

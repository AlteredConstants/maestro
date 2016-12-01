import Model from 'model/Model';
import getBouts from 'util/getBouts';

export default class Round extends Model {
  constructor({ seededCompetitors = [] }) {
    super();
    this.bouts = getBouts(seededCompetitors);
  }
}

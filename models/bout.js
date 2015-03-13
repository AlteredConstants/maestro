import Immutable from 'immutable';
import Model from 'models/model';

const internal = new WeakMap();

function getScoreSheet(fencer) {
	return Immutable.Map({fencer, score: 0});
}

let tempId = 0;
const defaults = {
	id: () => tempId++,
	isCompleted: false
};

const translations = {
	right: rightFencer => getScoreSheet(rightFencer),
	left: leftFencer => getScoreSheet(leftFencer)
};

export default class Bout extends Model {
	constructor(params) {
		super(params, internal, {defaults, translations});
	}

	getId() {
		return internal.get(this).get('id');
	}

	getRightFencer() {
		return internal.get(this).get('right').get('fencer');
	}

	getLeftFencer() {
		return internal.get(this).get('left').get('fencer');
	}

	getRightScore() {
		return internal.get(this).get('right').get('score');
	}

	getLeftScore() {
		return internal.get(this).get('left').get('score');
	}

	isCompleted() {
		return internal.get(this).get('isCompleted');
	}

	complete() {

	}
}

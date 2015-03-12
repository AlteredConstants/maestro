import Immutable from 'immutable';
import is from 'check-types';

const internal = new WeakMap();

function getScoreSheet(fencer) {
	return Immutable.Map({fencer, score: 0});
}

let tempId = 0;
function parse(params) {
	return Immutable.Map(params).withMutations(function(map) {
		if (is.not.assigned(map.get('id')))
			map.set('id', tempId++);
		map.set('right', getScoreSheet(params.rightFencer));
		map.set('left', getScoreSheet(params.leftFencer));
	});
}

export default class Bout {
	constructor(params) {
		internal.set(this, parse(params));
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
}

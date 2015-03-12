import Immutable from 'immutable';
import Bout from 'models/bout';

const internal = new WeakMap();

function getRoundSize(fencerCount) {
	return Math.pow(2, Math.ceil(Math.log(fencerCount) / Math.log(2)));
}

function getFullRound(roundItems, defaultItem) {
	const roundSize = getRoundSize(roundItems.size);
	const defaultItemCount = roundSize - roundItems.size;
	if (defaultItemCount !== 0) {
		let defaultItems = Immutable.Repeat(defaultItem, defaultItemCount);
		return roundItems.concat(defaultItems);
	}
	return roundItems;
}

function getBouts(roundItems) {
	let midpoint = roundItems.size/2;
	let topHalf = roundItems.take(midpoint);
	let bottomHalf = roundItems.toSeq().reverse().take(midpoint).toList();
	return topHalf.zipWith(
		(rightFencer, leftFencer) => new Bout({rightFencer, leftFencer}),
		bottomHalf
	);
}

function parse(params) {
	return Immutable.Map(params).withMutations(function(map) {
		map.set('bouts', Immutable.List(map.get('bouts')));
	});
}

export default class Round {
	constructor(params) {
		internal.set(this, parse(params));
	}

	getBouts() {
		return internal.get(this).get('bouts');
	}
}

export function createRound(competitors, defaultItem) {
	let roundItems = getFullRound(Immutable.List(competitors), defaultItem);
	let bouts = getBouts(roundItems);
	return new Round({bouts});
}

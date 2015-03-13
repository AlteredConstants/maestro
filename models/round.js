import Immutable from 'immutable';
import Model from 'models/model';
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

const translations = {
	bouts: bouts => Immutable.List(bouts)
};

export default class Round extends Model {
	constructor(params) {
		super(params, internal, {translations});
	}

	getBouts() {
		return internal.get(this).get('bouts');
	}
}

export function createRound(competitors, defaultItem) {
	let roundItems = getFullRound(Immutable.List(competitors), defaultItem);
	return new Round({bouts: getBouts(roundItems)});
}

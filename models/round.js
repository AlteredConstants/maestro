import Immutable from 'immutable';
import Model from 'models/model';
import Bout from 'models/bout';
import BoutStore from 'stores/bout_store';

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

const defaults = {
	id: () => Date.now().toString(),
	bouts: Immutable.Map()
};

const denormalizers = {
	bouts: {
		model: Bout,
		run: BoutStore.get
	}
};

const translations = {
	bouts: bouts => Immutable.Map(bouts)
};

export default class Round extends Model {
	constructor(params) {
		super(params, internal, {defaults, denormalizers, translations});
	}

	get bouts() {
		return internal.get(this).get('bouts');
	}

	static create(seededCompetitors, defaultItem) {
		let roundItems = getFullRound(Immutable.List(seededCompetitors), defaultItem);
		return new Round({bouts: getBouts(roundItems)});
	}
}

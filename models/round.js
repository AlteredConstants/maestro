import Immutable from 'immutable';

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

function getMatches(competitors, defaultItem) {
	let roundItems = getFullRound(competitors, defaultItem);
	let midpoint = roundItems.size/2;
	let topHalf = roundItems.take(midpoint);
	let bottomHalf = roundItems.toSeq().reverse().take(midpoint).toList();
	return topHalf.zipWith(
		(first, second) => Immutable.List.of(first, second),
		bottomHalf);
}

function parse(params) {
	return Immutable.Map(params).withMutations(function(map) {
		const defaultItem = map.get('defaultItem');
		const competitors = Immutable.List(map.get('competitors'));
		map.set('matches', getMatches(competitors, defaultItem));
	});
}

export default class Round {
	constructor(params) {
		internal.set(this, parse(params));
	}

	getMatches() {
		return internal.get(this).get('matches');
	}
}

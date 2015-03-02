import React from 'react';
import Fencer from 'models/fencer';
import Immutable from 'immutable';
import is from 'check-types';

function getBracketSize(fencerCount) {
	return Math.pow(2, Math.ceil(Math.log(fencerCount) / Math.log(2)));
}

function getPairs(competitors) {
	let midpoint = competitors.size/2;
	let topHalf = competitors.take(midpoint);
	let bottomHalf = competitors.toSeq().reverse().take(midpoint).toList();
	return topHalf.zip(bottomHalf);
}

export default React.createClass({
	render() {
		const event = this.props.event;
		const fencers = this.props.fencers;

		if (is.not.assigned(event) || is.not.assigned(fencers))
			return null;

		const eventFencerIds = event.getFencerIds();
		let eventFencers = fencers.filter(f => eventFencerIds.contains(f.getId()));

		if (eventFencers.size < 2)
			return <p>Not enough fencers in the event. <Link to="events-fencers">Select more.</Link></p>;

		let bracketSize = getBracketSize(eventFencers.size);
		const byeFencer = new Fencer({name: "Sunny"});
		let byes = Immutable.Repeat(byeFencer, bracketSize - eventFencers.size);
		let competitors = eventFencers.concat(byes);
		let pairs = getPairs(competitors);

		return (
			<section>
				<h1>First Round</h1>
				<ul>
					{
						pairs.map(p => <li>{p[0].getName()} vs. {p[1].getName()}</li>)
							// TODO: Remove once we can update to React 0.13.
							.toArray()
					}
				</ul>
			</section>
		);
	}
});

import React from 'react';
import Fencer from 'models/fencer';
import {createRound} from 'models/round';
import Immutable from 'immutable';
import is from 'check-types';

export default React.createClass({
	render() {
		const event = this.props.event;
		const fencers = this.props.fencers;

		if (is.not.assigned(event) || is.not.assigned(fencers))
			return null;

		const eventFencerIds = event.fencerIds;
		let eventFencers = fencers.filter(f => eventFencerIds.contains(f.id));

		if (eventFencerIds.size < 2)
			return <p>Not enough fencers in the event. <Link to="events-fencers">Select more.</Link></p>;
		if (eventFencers.size !== eventFencerIds.size)
			throw new Error("The event has fencer ID's for which there are no records.");

		let bouts = createRound(eventFencers, new Fencer({name: "Sunny"})).bouts;

		return (
			<section>
				<h1>First Round</h1>
				<ul>
					{
						bouts.map(b =>
							<li key={'bout-' + b.id}>
								{b.rightFencer.name}
								{' vs. '}
								{b.leftFencer.name}
							</li>
						)
						// TODO: Remove once we can update to React 0.13.
						.toArray()
					}
				</ul>
			</section>
		);
	}
});

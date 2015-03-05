import React from 'react';
import Fencer from 'models/fencer';
import Round from 'models/round';
import Immutable from 'immutable';
import is from 'check-types';

export default React.createClass({
	render() {
		const event = this.props.event;
		const fencers = this.props.fencers;

		if (is.not.assigned(event) || is.not.assigned(fencers))
			return null;

		const eventFencerIds = event.getFencerIds();
		let eventFencers = fencers.filter(f => eventFencerIds.contains(f.getId()));

		if (eventFencerIds.size < 2)
			return <p>Not enough fencers in the event. <Link to="events-fencers">Select more.</Link></p>;
		if (eventFencers.size !== eventFencerIds.size)
			throw new Error("The event has fencer ID's for which there are no records.");

		let matches = new Round({
			competitors: eventFencers,
			defaultItem: new Fencer({name: "Sunny"})
		}).getMatches();

		return (
			<section>
				<h1>First Round</h1>
				<ul>
					{
						matches.map(m => <li>{m.get(0).getName()} vs. {m.get(1).getName()}</li>)
							// TODO: Remove once we can update to React 0.13.
							.toArray()
					}
				</ul>
			</section>
		);
	}
});

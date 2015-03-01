import React from 'react';
import FencerSelect from './fencer_select.jsx!';
import is from 'check-types';

export default React.createClass({
	render() {
		const event = this.props.event;
		const fencers = this.props.fencers;
		if (is.not.assigned(fencers) || is.not.assigned(event)) {
			// TODO: Should probably have a spinner or such.
			return null;
		}

		return (
			<ul>
				{
					fencers.map(fencer =>
						<li key={'fencer-' + fencer.getId()}>
							<FencerSelect event={event} fencer={fencer} />
						</li>
					)
					// TODO: Remove once we can update to React 0.13.
					.toArray()
				}
			</ul>
		);
	}
});

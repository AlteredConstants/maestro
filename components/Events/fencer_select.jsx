import React from 'react';
import EventActions from 'actions/event_actions';

export default React.createClass({
	toggleFencerInEvent(fencer, e) {
		if (e.target.checked)
			EventActions.addFencer(fencer);
		else
			EventActions.removeFencer(fencer);
	},

	render() {
		const event = this.props.event;
		const fencer = this.props.fencer;
		return (
			<label>
				<input type="checkbox"
					checked={event.fencers.some(f => f.id === fencer.id)}
					disabled={event.isRunning}
					onChange={this.toggleFencerInEvent.bind(this, fencer)} />
				{fencer.name}
			</label>
		);
	}
});

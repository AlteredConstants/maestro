import React from 'react';
import Reflux from 'reflux';
import FencerStateMixin from '../mixins/fencer_state';
import EventStore from 'stores/event_store';
import FencerSelect from './fencer_select.jsx!';

export default React.createClass({
	mixins: [FencerStateMixin, Reflux.connect(EventStore, "event")],

	getInitialState() {
		return { event: null };
	},

	componentDidMount() {
		this.setState({ event: EventStore.get() });
	},

	render() {
		const event = this.state.event;
		const fencers = this.state.fencers;
		let content;
		if (event) {
			content = fencers.map(fencer =>
				<li key={fencer.getId()}>
					<FencerSelect fencer={fencer} event={event} />
				</li>
			);
		}
		return (
			<section>
				<h1>Events</h1>
				<p>The following fencers are part of the event.</p>
				<ul>{content}</ul>
			</section>
		);
	}
});

import Reflux from 'reflux';
import Event from 'models/event';
import FencerActions from 'actions/fencer_actions';
import EventActions from 'actions/event_actions';
import is from 'check-types';

export default Reflux.createStore({
	listenables: EventActions,

	init: function() {
		this.listenTo(FencerActions.remove, this.removeFencer);
	},

	get() {
		if (is.not.assigned(localStorage.event))
			return new Event();
		let event = JSON.parse(localStorage.event);
		if (is.not.object(event))
			return new Event();
		return new Event(event);
	},

	addFencer(fencer) {
		let event = this.get().addFencer(fencer);
		localStorage.event = JSON.stringify(event);
		this.trigger(event);
	},

	removeFencer(fencer) {
		let event = this.get().removeFencer(fencer);
		localStorage.event = JSON.stringify(event);
		this.trigger(event);
	}
});

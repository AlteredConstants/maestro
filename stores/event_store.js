import Reflux from 'reflux';
import Event from 'models/event';
import EventActions from 'actions/event_actions';
import is from 'check-types';

export default Reflux.createStore({
	listenables: EventActions,

	get() {
		if (localStorage.event) {
			let event = JSON.parse(localStorage.event);
			if (is.not.object(event))
				return new Event();
			return new Event(event);
		} else {
			return new Event();
		}
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

import Reflux from 'reflux';
import Event from 'models/event';
import FencerActions from 'actions/fencer_actions';
import EventActions from 'actions/event_actions';
import is from 'check-types';

function onAddFencer(fencer) {
	let event = this.get().addFencer(fencer);
	localStorage.event = JSON.stringify(event);
	this.trigger(event);
}

function onRemoveFencer(fencer) {
	let event = this.get().removeFencer(fencer);
	localStorage.event = JSON.stringify(event);
	this.trigger(event);
}

export default Reflux.createStore({
	init: function() {
		this.listenTo(EventActions.addFencer, onAddFencer);
		this.listenTo(EventActions.removeFencer, onRemoveFencer);
		this.listenTo(FencerActions.remove, onRemoveFencer);
	},

	get() {
		if (is.not.assigned(localStorage.event))
			return new Event();
		let event = JSON.parse(localStorage.event);
		if (is.not.object(event))
			return new Event();
		return new Event(event);
	}
});

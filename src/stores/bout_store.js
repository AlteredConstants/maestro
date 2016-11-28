import Reflux from 'reflux';
import Bout from 'models/bout';
import BoutActions from 'actions/bout_actions';
import LocalStorage from 'interfaces/local_storage';

function getAllLocal() {
	return LocalStorage.getMany(Bout);
}

function setAllLocal(bouts) {
	LocalStorage.setMany(Bout, bouts);
}

function updateLocal(bout) {
	let newBouts = getAllLocal().set(bout.id, bout);
	setAllLocal(newBouts);
	return newBouts;
}

function onAdd(bout) {
	let updatedBouts = updateLocal(bout);
	this.trigger(updatedBouts);
}

function onAwardTouch() {

}

function onComplete(bout) {

}

export default Reflux.createStore({
	init: function() {
		this.listenTo(BoutActions.add, onAdd);
		this.listenTo(BoutActions.awardTouch, onAwardTouch);
		this.listenTo(BoutActions.complete, onComplete);
	},

	getAll() {
		return getAllLocal();
	},

	get(id) {
		return getAllLocal().get(id);
	}
});

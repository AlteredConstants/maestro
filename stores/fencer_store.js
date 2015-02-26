import Reflux from 'reflux';
import FencerActions from '../actions/fencer_actions';

var FencerStore = Reflux.createStore({
    listenables: FencerActions,

    getAll() {
        if (localStorage.fencers) {
            let fencers = JSON.parse(localStorage.fencers);
            if (!Array.isArray(fencers))
                fencers = [];
            return fencers;
        } else {
            return [];
        }
    },

    add(fencer) {
        let fencers = this.getAll();
        fencers.push(fencer);
        localStorage.fencers = JSON.stringify(fencers);
        this.trigger(fencers);
    },

    remove(fencer) {
        let fencers = this.getAll().filter(f => f !== fencer);
        localStorage.fencers = JSON.stringify(fencers);
        this.trigger(fencers);
    }
});

export default FencerStore;
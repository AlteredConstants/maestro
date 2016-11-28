import Reflux from 'reflux';
import FencerStore from 'stores/fencer_store';

export default {
  mixins: [Reflux.connect(FencerStore, "fencers")],

  getInitialState() {
    return { fencers: null };
  },

  componentDidMount() {
    this.setState({ fencers: FencerStore.getAll() });
  }
};

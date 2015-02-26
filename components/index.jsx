import React from 'react';
import Reflux from 'reflux';
import FencerStore from '../stores/fencer_store';
import FencerList from './fencer_list.jsx!';

var Index = React.createClass({
    mixins: [Reflux.connect(FencerStore, "fencers")],

    getInitialState() {
        return { fencers: [] };
    },

    componentDidMount() {
        this.setState({ fencers: FencerStore.getAll() });
    },

    render() {
        return (
            <section>
                <h1>Fencers</h1>
                <FencerList fencers={this.state.fencers} />
            </section>
        );
    }
});

export default Index;
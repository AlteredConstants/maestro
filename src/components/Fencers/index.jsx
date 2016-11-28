import React from 'react';
import FencerStateMixin from '../mixins/fencer_state';
import FencerControlList from './fencer_control_list.jsx!';

export default React.createClass({
  mixins: [FencerStateMixin],

  render() {
    return (
      <section>
        <h1>Fencers</h1>
        <FencerControlList fencers={this.state.fencers} />
      </section>
    );
  }
});

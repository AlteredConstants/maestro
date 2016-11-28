import React from 'react';
import FencerSelectList from './fencer_select_list.jsx!';

export default React.createClass({
  render() {
    return (
      <section>
        <p>The following fencers are part of the event.</p>
        <FencerSelectList {...this.props} />
      </section>
    );
  }
});

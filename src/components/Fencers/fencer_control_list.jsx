import React from 'react';
import is from 'check-types';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import FencerControl from './fencer_control';

// Stuck with object until input "new" has its value lifted
// into a global state object (with onChange hooks).
export default React.createClass({
  propTypes: {
    fencers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Fencer)),
  },

  addFencer() {
    const fencerNode = this.new;
    const name = fencerNode.value;
    fencerNode.value = '';
    FencerActions.add(new Fencer({ name }));
  },

  render() {
    const fencers = this.props.fencers;
    if (is.not.assigned(fencers)) {
      // TODO: Should probably have a spinner or such.
      return <p>Nothing to see here...</p>;
    }
    return (
      <ul>
        {
          fencers.map(fencer =>
            <li key={`fencer-${fencer.id}`}>
              <FencerControl fencer={fencer} />
            </li>,
          )
        }
        <li>
          <input ref={(c) => { this.new = c; }} />
          {' '}
          <button onClick={this.addFencer}>Add</button>
        </li>
      </ul>
    );
  },
});

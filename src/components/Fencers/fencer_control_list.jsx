import is from 'check-types';
import { map } from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import { addFencer } from 'action';
import Fencer from 'model/Fencer';
import FencerControl from './fencer_control';

// Stuck with object until input "new" has its value lifted
// into a global state object (with onChange hooks).
class FencerControlList extends React.Component {
  submitNewFencer = () => {
    const fencerNode = this.new;
    const [firstName, lastName] = fencerNode.value.split(' ');
    fencerNode.value = '';
    this.props.addFencer(new Fencer({ firstName, lastName }));
  };

  render() {
    if (is.not.assigned(this.props.fencers)) {
      // TODO: Should probably have a spinner or such.
      return <p>Nothing to see here...</p>;
    }
    return (
      <ul>
        {
          map(fencer =>
            <li key={`fencer-${fencer.id}`}>
              <FencerControl fencer={fencer} />
            </li>,
            this.props.fencers,
          )
        }
        <li>
          <input ref={(c) => { this.new = c; }} />
          {' '}
          <button onClick={this.submitNewFencer}>Add</button>
        </li>
      </ul>
    );
  }
}

FencerControlList.propTypes = {
  fencers: React.PropTypes.objectOf(React.PropTypes.instanceOf(Fencer)),
  addFencer: React.PropTypes.func.isRequired,
};

export default connect(
  state => ({
    fencers: state.fencers,
  }),
  dispatcher => ({
    addFencer: fencer => dispatcher(addFencer(fencer)),
  }),
)(FencerControlList);

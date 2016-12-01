import is from 'check-types';
import { map } from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import Event from 'model/Event';
import Fencer from 'model/Fencer';
import FencerSelect from './fencer_select';

function FencerSelectList({ event, fencers }) {
  if (is.not.assigned(fencers) || is.not.assigned(event)) {
    // TODO: Should probably have a spinner or such.
    return null;
  }

  return (
    <ul>
      {
        map(fencer => (
          <li key={`fencer-${fencer.id}`}>
            <FencerSelect event={event} fencer={fencer} />
          </li>
        ), fencers)
      }
    </ul>
  );
}

FencerSelectList.propTypes = {
  event: React.PropTypes.instanceOf(Event),
  fencers: React.PropTypes.objectOf(React.PropTypes.instanceOf(Fencer)),
};

export default connect(
  state => ({
    event: state.sampleEvent,
    fencers: state.fencers,
  }),
)(FencerSelectList);

import React from 'react';
import is from 'check-types';
import Event from 'models/event';
import Fencer from 'models/fencer';
import FencerSelect from './fencer_select';

export default function FencerSelectList({ event, fencers }) {
  if (is.not.assigned(fencers) || is.not.assigned(event)) {
    // TODO: Should probably have a spinner or such.
    return null;
  }

  return (
    <ul>
      {
        fencers.map(fencer => (
          <li key={`fencer-${fencer.id}`}>
            <FencerSelect event={event} fencer={fencer} />
          </li>
        ))
      }
    </ul>
  );
}

FencerSelectList.propTypes = {
  event: React.PropTypes.instanceOf(Event),
  fencers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Fencer)),
};

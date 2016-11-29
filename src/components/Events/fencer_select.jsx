import React from 'react';
import EventActions from 'actions/event_actions';
import Event from 'models/event';
import Fencer from 'models/fencer';

function toggleFencerInEvent(fencer, e) {
  if (e.target.checked) EventActions.addFencer(fencer);
  else EventActions.removeFencer(fencer);
}

export default function FencerSelect({ event, fencer }) {
  const id = `fencer-${fencer.id}-checkbox`;
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={event.fencers.some(f => f.id === fencer.id)}
        disabled={event.isRunning}
        onChange={e => toggleFencerInEvent(fencer, e)}
      />
      {fencer.name}
    </label>
  );
}

FencerSelect.propTypes = {
  event: React.PropTypes.instanceOf(Event),
  fencer: React.PropTypes.instanceOf(Fencer),
};

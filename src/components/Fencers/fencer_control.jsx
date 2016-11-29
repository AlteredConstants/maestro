import React from 'react';
import FencerActions from 'actions/fencer_actions';
import Fencer from 'models/fencer';

function removeFencer(id) {
  FencerActions.remove(id);
}

export default function FencerControl({ fencer }) {
  return (
    <span>
      <button onClick={() => removeFencer(fencer.id)}>
        Remove
      </button>
      {` ${fencer.name}`}
    </span>
  );
}

FencerControl.propTypes = {
  fencer: React.PropTypes.instanceOf(Fencer),
};

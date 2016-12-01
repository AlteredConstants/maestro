import { compose } from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFencer } from 'action';
import Fencer from 'model/Fencer';

function FencerControl({ fencer, remove }) {
  return (
    <span>
      <button onClick={() => remove(fencer)}>
        Remove
      </button>
      {` ${fencer.name}`}
    </span>
  );
}

FencerControl.propTypes = {
  fencer: React.PropTypes.instanceOf(Fencer),
  remove: React.PropTypes.func,
};

export default connect(
  null,
  dispatcher => ({
    remove: compose(dispatcher, deleteFencer),
  }),
)(FencerControl);

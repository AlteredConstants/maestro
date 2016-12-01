import React from 'react';
import { connect } from 'react-redux';
import {
  createAddEventCompetitorAction,
  createRemoveEventCompetitorAction,
} from 'action';
import Event from 'model/Event';
import Fencer from 'model/Fencer';

function FencerSelect({ event, fencer, addCompetitor, removeCompetitor }) {
  const id = `fencer-${fencer.id}-checkbox`;
  const changeCompetitor = isAdd => (isAdd ? addCompetitor : removeCompetitor)();
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={event.fencers.some(f => f.id === fencer.id)}
        disabled={event.isRunning}
        onChange={e => changeCompetitor(e.target.checked)}
      />
      {fencer.name}
    </label>
  );
}

FencerSelect.propTypes = {
  event: React.PropTypes.instanceOf(Event).isRequired,
  fencer: React.PropTypes.instanceOf(Fencer).isRequired,
  addCompetitor: React.PropTypes.func.isRequired,
  removeCompetitor: React.PropTypes.func.isRequired,
};

export default connect(
  null,
  (dispatcher, props) => ({
    addCompetitor: () => dispatcher(
      createAddEventCompetitorAction(props.event, props.fencer),
    ),
    removeCompetitor: () => dispatcher(
      createRemoveEventCompetitorAction(props.event, props.fencer),
    ),
  }),
)(FencerSelect);

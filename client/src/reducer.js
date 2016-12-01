import { keyBy, property, omit, set } from 'lodash/fp';

const keyById = keyBy(property('id'));

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_FENCERS_FULFILLED': {
      return {
        ...state,
        fencers: keyById(action.payload),
      };
    }
    case 'ADD_FENCER_FULFILLED': {
      const fencer = action.payload;
      return {
        ...state,
        fencers: set(fencer.id, fencer, state.fencers),
      };
    }
    case 'DELETE_FENCER_FULFILLED': {
      const id = action.payload;
      return {
        ...state,
        fencers: omit([id], state.fencers),
      };
    }
    case 'GET_SAMPLE_EVENT_FULFILLED': {
      return {
        ...state,
        sampleEvent: action.payload,
      };
    }
    case 'ADD_EVENT_COMPETITOR': {
      const { event, fencer } = action.payload;
      return {
        ...state,
        sampleEvent: event.addFencer(fencer),
      };
    }
    case 'REMOVE_EVENT_COMPETITOR': {
      const { event, fencer } = action.payload;
      return {
        ...state,
        sampleEvent: event.removeFencer(fencer),
      };
    }
    case 'START_EVENT': {
      const event = action.payload;
      if (event.fencers.length < 2) {
        throw new Error('Not enough fencers in the event.');
      }
      return {
        ...state,
        sampleEvent: event.start(),
      };
    }
    case 'STOP_EVENT': {
      const event = action.payload;
      return {
        ...state,
        sampleEvent: event.stop(),
      };
    }
    default: {
      return state;
    }
  }
}

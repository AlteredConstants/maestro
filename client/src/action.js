import { head } from 'lodash/fp';
import Api from 'api';

export const getFencers = () => ({
  type: 'GET_FENCERS',
  payload: Api.getFencers(),
});

export const addFencer = fencer => ({
  type: 'ADD_FENCER',
  payload: Api.addFencer(fencer),
});

export const deleteFencer = fencer => ({
  type: 'DELETE_FENCER',
  payload: Api.deleteFencer(fencer),
});

export const getSampleEvent = () => ({
  type: 'GET_SAMPLE_EVENT',
  payload: Api.getEvents({ askfred_id: '83239' }).then(head),
});

export const createAddEventCompetitorAction = (event, fencer) => ({
  type: 'ADD_EVENT_COMPETITOR',
  payload: { event, fencer },
});

export const createRemoveEventCompetitorAction = (event, fencer) => ({
  type: 'REMOVE_EVENT_COMPETITOR',
  payload: { event, fencer },
});

export const createStartEventAction = event => ({
  type: 'START_EVENT',
  payload: event,
});

export const createStopEventAction = event => ({
  type: 'STOP_EVENT',
  payload: event,
});

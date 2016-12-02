import is from 'check-types';
import { method } from 'lodash/fp';
import Fencer from 'model/Fencer';
import Event from 'model/Event';

function fetchEmpty(...params) {
  return fetch(...params);
}

function fetchJson(...params) {
  return fetch(...params).then(method('json'));
}

const toFencer = ({ id, first_name, last_name }) => new Fencer({
  id,
  firstName: first_name,
  lastName: last_name,
});

const toEvent = ({ id, preregistered_fencers }) => new Event({
  id,
  fencers: preregistered_fencers.map(toFencer),
});

export default class Api {
  static async getFencers() {
    const fencers = await fetchJson('/api/fencers');
    return fencers.map(toFencer);
  }

  static async addFencer(fencer) {
    const newFencer = await fetchJson('/api/fencers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: fencer.firstName, last_name: fencer.lastName }),
    });
    return toFencer(newFencer);
  }

  static async deleteFencer(fencer) {
    const id = is.instance(fencer, Fencer) ? fencer.id : fencer;
    await fetchEmpty(`/api/fencers/${id}`, { method: 'DELETE' });
    return id;
  }

  static async getEvents({ askfred_id }) {
    const tournaments = await fetchJson('/api/tournaments?populate=events.preregistered_fencers');
    return tournaments.reduce(
      (events, tournament) => [
        ...events,
        ...tournament.events.filter(e => e.askfred_id === askfred_id).map(toEvent),
      ],
      [],
    );
  }
}

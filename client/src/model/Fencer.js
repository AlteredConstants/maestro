import Model from 'model/Model';

export default class Fencer extends Model {
  constructor({ id, firstName, lastName }) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get name() {
    const name = [];
    if (this.firstName) name.push(this.firstName);
    if (this.lastName) name.push(this.lastName);
    return name.join(' ');
  }
}

export const ByeFencer = new Fencer({ id: 'bye', firstName: '[Sunny]', lastName: '-Bye-' });

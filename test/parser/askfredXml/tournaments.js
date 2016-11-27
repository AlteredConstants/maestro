import { expect } from 'chai';
import parseTournaments from 'parser/askfredXml/tournaments';
import testData from 'test/data/askfredTournamentXml.json';

describe('Parsing the askFRED XML Tournaments node list', () => {
  context('when the input is valid', () => {
    it('should return a list of tournaments', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.property('tournaments').that.is.an('array').of.length(1);
    });

    it('should return the askFRED ID of the tournament', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('tournaments[0].askfredId').that.equals('20209');
    });

    it('should return the name of the tournament', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('tournaments[0].name').that.equals('Gopher Open 2012');
    });

    it('should return a list of events', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.property('events').that.is.an('array').of.length(3);
    });

    it('should return the askFRED ID of the event', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[2].askfredId').that.equals('83237');
    });

    it('should return the askFRED ID of the tournament within the event', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[2].askfredTournamentId').that.equals('20209');
    });

    it('should return the description of the event', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[2].description').that.equals('Saber Event');
    });

    it('should return the weapon of the event in lowercase', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[2].weapon').that.equals('saber');
    });

    it('should return the date of the event as a Date', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[2].date')
        .that.equals(new Date('2012-10-20 13:00:00'));
    });

    it('should return a list of the IDs of the preregistered fencers in the events', () => {
      const result = parseTournaments(testData);
      expect(result).to.have.deep.property('events[1].preregisteredFencers')
        .with.members(['82126', '19931', '69056']);
    });
  });
});

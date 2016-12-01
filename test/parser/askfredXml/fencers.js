import { expect } from 'chai';
import { set } from 'lodash/fp';
import parseFencers from 'parser/askfredXml/fencers';
import testData from 'test/data/askfredTournamentXml.json';

describe('Parsing the askFRED XML Fencers node list', () => {
  context('when the input is valid', () => {
    it('should return a list of fencers', () => {
      const result = parseFencers(testData);
      expect(result).to.be.an('array').of.length(5);
    });

    it('should return the askFRED ID of the fencer', () => {
      const result = parseFencers(testData);
      expect(result).to.have.deep.property('[0].askfredId').that.equals('69056');
    });

    it('should return the name of the fencer', () => {
      const result = parseFencers(testData);
      expect(result).to.have.deep.property('[1].firstName').that.equals('Willa');
      expect(result).to.have.deep.property('[1].lastName').that.equals('Gelvick');
    });

    it('should return the birth year of the fencer as a Number', () => {
      const result = parseFencers(testData);
      expect(result).to.have.deep.property('[2].birthYear').that.equals(1975);
    });

    it('should return the gender of the fencer', () => {
      const result = parseFencers(testData);
      expect(result).to.have.deep.property('[2].gender').that.equals('M');
      expect(result).to.have.deep.property('[3].gender').that.equals('W');
    });

    it('should return the ratings of the fencer', () => {
      const result = parseFencers(testData);
      expect(result).to.have.deep.property('[4].rating.foil')
        .that.equals({ letter: 'E', year: 2016 });
      expect(result).to.not.have.deep.property('[4].rating.epee');
      expect(result).to.not.have.deep.property('[4].rating.saber');
    });

    it('should return the rating in upper case', () => {
      const epeeRatingPath = 'FencingData.FencerDatabase[0].Fencer[0].Rating[1]._';
      const result = parseFencers(set(epeeRatingPath, 'e2016', testData));
      expect(result).to.have.deep.property('[0].rating.epee')
        .that.equals({ letter: 'E', year: 2016 });
    });
  });
});

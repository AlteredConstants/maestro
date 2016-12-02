import { expect } from 'chai';
import td from 'testdouble';
import * as Util from 'util';
import * as parseFencersWrapper from 'parser/askfredXml/fencers';
import * as parseTournamentsWrapper from 'parser/askfredXml/tournaments';
import parseAskfredXml from 'parser/askfredXml';


describe('Parsing the askFRED XML file', () => {
  it('should delegate the XML string conversion', async () => {
    const parseXmlString = td.replace(Util, 'parseXmlString');
    const parseFencers = td.replace(parseFencersWrapper, 'default');
    const parseTournaments = td.replace(parseTournamentsWrapper, 'default');
    td.when(parseXmlString('ew. XML.')).thenReturn(Promise.resolve('XML-to-JSON madness!'));
    td.when(parseFencers('XML-to-JSON madness!')).thenReturn('parsed fencers');
    td.when(parseTournaments('XML-to-JSON madness!')).thenReturn({
      tournaments: 'parsed tournaments',
      events: 'parsed events',
    });

    const result = await parseAskfredXml('ew. XML.');

    expect(result).to.have.property('rawJson').that.equals('XML-to-JSON madness!');
    expect(result).to.have.property('fencers').that.equals('parsed fencers');
    expect(result).to.have.property('tournaments').that.equals('parsed tournaments');
    expect(result).to.have.property('events').that.equals('parsed events');
  });
});

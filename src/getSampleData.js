import promisify from 'es6-promisify';
import { parseString } from 'xml2js';
import fs from 'fs';

const parseXml = promisify(parseString);
const readFile = promisify(fs.readFile);

function extractRatings(fencerNode) {
  return fencerNode.Rating.reduce((ratings, ratingNode) => {
    const { _: rating, $: { Weapon } } = ratingNode;
    if (!rating || rating === 'U') return ratings;
    const [, letter, year] = rating.match(/^([a-z])([0-9]{4})/i);
    return {
      ...ratings,
      [Weapon.toLowerCase()]: {
        letter: letter.toUpperCase(),
        year: Number(year),
      },
    };
  }, {});
}

function extractUsfaId(fencerNode) {
  if (!fencerNode.Membership) return null;
  const membershipNodeList = fencerNode.Membership.filter(m => m.$.Org === 'USFA');
  if (membershipNodeList.length === 0) return null;
  return membershipNodeList[0]._;
}

function extractFencer(fencerNode) {
  const {
    FencerID: askfredId,
    FirstName: firstName,
    LastName: lastName,
    BirthYear: birthYearValue,
    Gender: genderValue,
  } = fencerNode.$;
  const birthYear = Number(birthYearValue);
  const gender = (genderValue === 'F') ? 'W' : genderValue;
  const rating = extractRatings(fencerNode);
  const fencer = { askfredId, firstName, lastName, birthYear, gender, rating };
  const usfaId = extractUsfaId(fencerNode);
  if (usfaId) fencer.usfaId = usfaId;
  return fencer;
}

function extractFencers(fencingDataNode) {
  const fencerNodeList = fencingDataNode.FencerDatabase[0].Fencer;
  return fencerNodeList.map(extractFencer);
}

export default function getSampleData() {
  return readFile('./data/2012-gopher-open.frd.xml', 'utf8')
    .then(parseXml)
    .then(documentRoot => ({
      fencers: extractFencers(documentRoot.FencingData),
      raw: documentRoot,
    }));
}

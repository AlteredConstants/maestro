import promisify from 'es6-promisify';
import { parseString } from 'xml2js';
import fs from 'fs';

const parseXml = promisify(parseString);
const readFile = promisify(fs.readFile);

function extractRatings(fencerNode) {
  return fencerNode.Rating.reduce((ratings, ratingNode) => {
    const { _: rating, $: { Weapon } } = ratingNode;
    if (rating !== 'U') {
      return {
        ...ratings,
        [Weapon.toLowerCase()]: rating,
      };
    }
    return ratings;
  }, {});
}

function extractUSFAId(fencerNode) {
  if (!fencerNode.Membership) return null;
  const membershipNodeList = fencerNode.Membership.filter(m => m.$.Org === 'USFA');
  if (membershipNodeList.length === 0) return null;
  return membershipNodeList[0]._;
}

function extractFencer(fencerNode) {
  const {
    FencerID: id,
    FirstName: firstName,
    LastName: lastName,
    BirthYear: birthYear,
    Gender: gender,
  } = fencerNode.$;
  const rating = extractRatings(fencerNode);
  const usfaId = extractUSFAId(fencerNode);
  return { id, firstName, lastName, birthYear, gender, rating, usfaId };
}

function extractFencers(fencingDataNode) {
  const fencerNodeList = fencingDataNode.FencerDatabase[0].Fencer;
  return fencerNodeList.reduce((fencers, fencerNode) => {
    const fencer = extractFencer(fencerNode);
    return { ...fencers, [fencer.id]: fencer };
  }, {});
}

export default readFile('./data/2012-gopher-open.frd.xml', 'utf8')
.then(parseXml)
.then(documentRoot => ({
  fencers: extractFencers(documentRoot.FencingData),
  raw: documentRoot,
}));

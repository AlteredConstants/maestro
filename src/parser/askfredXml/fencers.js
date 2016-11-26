function parseRatings(fencerNode) {
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

function parseUsfaId(fencerNode) {
  if (!fencerNode.Membership) return null;
  const membershipNodeList = fencerNode.Membership.filter(m => m.$.Org === 'USFA');
  if (membershipNodeList.length === 0) return null;
  return membershipNodeList[0]._;
}

function parseFencer(fencerNode) {
  const {
    FencerID: askfredId,
    FirstName: firstName,
    LastName: lastName,
    BirthYear: birthYearValue,
    Gender: genderValue,
  } = fencerNode.$;
  const birthYear = Number(birthYearValue);
  const gender = (genderValue === 'F') ? 'W' : genderValue;
  const rating = parseRatings(fencerNode);
  const fencer = { askfredId, firstName, lastName, birthYear, gender, rating };
  const usfaId = parseUsfaId(fencerNode);
  if (usfaId) fencer.usfaId = usfaId;
  return fencer;
}

export default function parseFencers(documentRoot) {
  const fencerNodeList = documentRoot.FencingData.FencerDatabase[0].Fencer;
  return fencerNodeList.map(parseFencer);
}

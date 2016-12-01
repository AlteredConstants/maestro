import { take, reverse, zipWith, times, constant } from 'lodash/fp';
import Bout from 'model/Bout';
import { ByeFencer } from 'model/Fencer';
import Opponent from 'model/Opponent';

function getRoundSize(competitorCount) {
  return 2 ** Math.ceil(Math.log(competitorCount) / Math.log(2));
}

function getFullRound(competitors) {
  const roundSize = getRoundSize(competitors.length);
  const byeCount = roundSize - competitors.length;
  const byes = times(constant(ByeFencer), byeCount);
  return competitors.concat(byes).map((c, index) => new Opponent({ seed: index + 1, ...c }));
}

export default function getBouts(seededCompetitors) {
  const roundCompetitors = getFullRound(seededCompetitors);
  const midpoint = roundCompetitors.length / 2;
  return zipWith(
    (rightFencer, leftFencer) => new Bout({ rightFencer, leftFencer }),
    take(midpoint, roundCompetitors),
    take(midpoint, reverse(roundCompetitors)),
  );
}

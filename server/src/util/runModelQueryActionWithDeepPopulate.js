import is from 'check-types';
import {
  flow, map, reduceRight,
  groupBy, sortBy, zipAll,
  invokeArgs, mapValues, nth,
} from 'lodash/fp';
import { camelify, ensureNonEmptyArray } from 'util';

const filterUniqueKeys = flow(
  // Sort and read in reverse so keys with deeper nesting show up first.
  sortBy(x => x),
  reduceRight((memo, nextKey) => (
    // Skip keys which match existing keys with deeper nesting.
    // They'll be auto-loaded later.
    (!nextKey || new RegExp(`^${nextKey}\\.`).test(memo.previousKey))
      ? memo
      : { previousKey: nextKey, result: [nextKey, ...memo.result] }
    ),
    { previousKey: null, result: [] },
  ),
  x => x.result,
);

const groupKeys = flow(
  filterUniqueKeys,
  // Split, but limit to 2 so as to not include the trailing empty element.
  map(invokeArgs('split', [/\.(.*)?/, 2])),
  // Camelify group index (top) keys to ensure they're not still snake case
  // from the query params.
  groupBy(keys => camelify(keys[0])),
  // Drop the now superfluous (first) column of top keys used by groupBy.
  mapValues(flow(zipAll, nth(1))),
);

async function populateNestedModel(maybeDocuments, maybeKeys) {
  const documents = ensureNonEmptyArray(maybeDocuments);
  if (!documents) throw new Error(`Missing documents to populate (Given "${JSON.stringify(maybeDocuments)}").`);
  const keys = ensureNonEmptyArray(maybeKeys);
  if (!keys) throw new Error(`Missing document keys to populate (Given "${JSON.stringify(maybeKeys)}").`);

  await Promise.map(Object.entries(groupKeys(keys)), async ([topKey, subKeys]) => (
    Promise.map(documents, async (document) => {
      if (!document[topKey]) throw new Error(`Key "${topKey}" not found in document ${document.constructor.name}(${document._id})`); // eslint-disable-line no-underscore-dangle
      await document.populate(document, [topKey]);
      if (subKeys) await populateNestedModel(document[topKey], subKeys);
    })
  ));
}

export default async function runModelQueryActionWithDeepPopulate(action, query, options) {
  const shouldDeepPopulate =
    options && (is.array(options.populate) || is.string(options.populate));
  const superOptions = shouldDeepPopulate ? { ...options, populate: false } : options;
  const result = await action(query, superOptions);
  if (shouldDeepPopulate) await populateNestedModel(result, options.populate);
  return result;
}

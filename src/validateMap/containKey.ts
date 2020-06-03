export function containKey(currentKey: (string | symbol | number)[], includeKeys: (string | symbol | number)[][]) {
  if (!includeKeys) return false;
  if (includeKeys.length <= 0) return true;
  return includeKeys.some((m, i) =>
    m.every((k, i) => k === currentKey[i] || typeof k === 'undefined' || typeof currentKey[i] === 'undefined'),
  );
}

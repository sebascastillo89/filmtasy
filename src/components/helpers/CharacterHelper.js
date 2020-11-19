export function getIdFromUrl(characterUrl) {
  const charPrefixIndex = characterUrl?.indexOf("people/") ?? -1;
  const charSuffixIndex = characterUrl?.lastIndexOf("/") ?? -1;

  if (charPrefixIndex >= 0 && charSuffixIndex) {
    const charId = characterUrl.substring(charPrefixIndex + 7, charSuffixIndex);
    if (!Number.isInteger(charId)) {
      return parseInt(charId);
    }
  }
  return null;
}

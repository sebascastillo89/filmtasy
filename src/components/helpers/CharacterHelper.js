import charImages from "./charImages.json";

export function getIdFromUrl(characterUrl) {
  const charPrefixIndex = characterUrl?.indexOf("people/") ?? -1;
  const charSuffixIndex = characterUrl?.lastIndexOf("/") ?? -1;

  if (charPrefixIndex >= 0 && charSuffixIndex) {
    const charId = characterUrl.substring(charPrefixIndex + 7, charSuffixIndex);
    const charInt = parseInt(charId);

    return isNaN(charInt) ? null : charInt;
  }
  return null;
}

export function getCharImage(charId) {
  return charImages[charId.toString()] ?? charImages["default"];
}

import React from "react";

export function getIdFromUrl(characterUrl) {
  return parseInt(
    characterUrl.substring(
      characterUrl.indexOf("people/") + 7,
      characterUrl.lastIndexOf("/")
    )
  );
}

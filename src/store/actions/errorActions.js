export const addError = (errorMessage) => ({
  type: "ADD_ERROR",
  payload: { error: errorMessage },
});

export const removeError = (index) => ({
  type: "REMOVE_ERROR",
  payload: { index: index },
});

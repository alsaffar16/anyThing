export const UID = "UID";

export function userID(id) {
  return {
    type: UID,
    id: id,
  };
}

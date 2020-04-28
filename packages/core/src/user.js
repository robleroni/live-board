/**
 * Globally managed user id
 */

let userId;

const setUserId = id => userId = id;
const getUserId = () => userId;

export default {
  setUserId,
  getUserId
}
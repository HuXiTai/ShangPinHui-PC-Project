import { v4 as uuidv4 } from "uuid";

export default function getUserTempId() {
  let userTempId = localStorage.getItem("userTempId_key");
  if (userTempId) {
    return userTempId;
  }
  userTempId = uuidv4();
  localStorage.setItem("userTempId_key", userTempId);
  return userTempId;
}

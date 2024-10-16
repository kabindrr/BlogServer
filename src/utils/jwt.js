import JWT from "jsonwebtoken";

import { config } from "../config/config.js";
const Access_Secret_Key = "1234567890qwertyuiopasdfghjklzxcvbnm";

export const singAccessJWT = (obj) => {
  
  const token = JWT.sign(obj, Access_Secret_Key, {
    expiresIn: "1d",
  });
  return token;
};
export const Verify_Access_JWT = (token) => {
  try {
    return JWT.verify(token, Access_Secret_Key);
  } catch (error) {
    console.log(error.message);
  }
};

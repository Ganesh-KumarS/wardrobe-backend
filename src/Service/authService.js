import "dotenv/config";
import jwt from "jsonwebtoken";

export function getJwtToken(data) {
  let token;
  try {
    token = jwt.sign(data, process.env.SecretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
  } catch (error) {
    token = null;
  }
  return token;
}

export function verifyJwtToken(token) {
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.SecretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });
  } catch (error) {
    verifiedToken = null;
  }
  return verifiedToken;
}

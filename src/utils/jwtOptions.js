import { ExtractJwt } from "passport-jwt";
import { environment } from '../env.js';

const SECRET_JWT = process.env.SECRET_JWT || environment.jwt.secret;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies.token;
  }
  return token;
};

export const jwtOptions = {
  secretOrKey: SECRET_JWT,
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
};

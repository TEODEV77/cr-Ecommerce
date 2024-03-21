import passport from "passport";

import { Strategy as jwtStrategy } from "passport-jwt";
import { jwtOptions } from "../utils/jwtOptions.js";

export const InitPassport = () => {
  passport.use(
    "jwt",
    new jwtStrategy(jwtOptions, (payload, done) => {
      return done(null, payload);
    })
  );
};

import passport from "passport";

export const Authenticate = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export const Authorized = (roles) => (req, res, next) => {
  const { role } = req.user;

  if (roles.includes(role)) {
    return next();
  }

  return res.status(403).json({ message: "Unauthorized" });
};

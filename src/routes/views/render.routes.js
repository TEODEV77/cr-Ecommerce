import { Router } from "express";
import { Authenticate } from "../../config/middleware/passport.mid.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("sign-in");
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/me", Authenticate('jwt'), (req, res) => {
  res.render("me", { user: req.user });
});

export default router;

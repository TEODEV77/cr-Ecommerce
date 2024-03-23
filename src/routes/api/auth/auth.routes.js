import { Router } from "express";
import AuthController from "../../../controllers/auth.controller.js";

const router = Router();

router.post("/register", (req, res) => {
  AuthController.register(req.body, res);
});

router.post("/login", (req, res) => {
  AuthController.login(req.body, res);
});

export default router;

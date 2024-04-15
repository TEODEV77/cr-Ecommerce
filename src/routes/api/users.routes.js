import { Router } from "express";
import { uploadFile } from "../../utils/multer.js";

import { Authenticate, Authorized } from "../../config/middleware/passport.mid.js";

import UserController from "../../controllers/user.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await UserController.get();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.patch("/premium/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await UserController.upgradeToPremium(id);
    res.status(201).json({ message: "User upgraded to premium" });
  } catch (error) {
    next(error);
  }
  
});

router.post(
  "/documents/:fileType",
  Authenticate("jwt"),
  uploadFile(),
  (req, res) => {
    UserController.uploadDocuments(req);
    res.json({ message: "File uploaded successfully" });
  }
);

router.delete('/', Authenticate('jwt'), Authorized(['admin']),  async (req, res, next) => {
  try {
    const out = await UserController.deleteInactiveUsers();
    res.status(200).json(out);
  } catch (error) {
    next(error);
  }
});

export default router;

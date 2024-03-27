import { Router } from "express";
import { uploadFile } from "../../utils/multer.js";

import { Authenticate } from "../../config/middleware/passport.mid.js";

import UserController from "../../controllers/user.controller.js";

const router = Router();

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

export default router;

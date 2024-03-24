import { Router } from "express";
import { uploadFile } from "../../utils/multer.js";

import { Authenticate } from "../../config/middleware/passport.mid.js";

import UserController from "../../controllers/user.controller.js";

const router = Router();

router.patch("/premium/:id", (req, res) => {
  const { id } = req.params;
  UserController.upgradeToPremium(id);
  res.json({ message: "User upgraded to premium" });
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

import { Router } from "express";
import { uploadFile } from "../../utils/multer.js";

import { Authenticate } from "../../config/middleware/passport.mid.js";

import UserController from "../../controllers/user.controller.js";

const router = Router();

router.post(
  "/documents/:fileType",
  Authenticate("jwt"),
  uploadFile(),
  (req, res) => {
    UserController.uploadDocuments(req);
    res.json({ message: "File uploaded successfully"});
  }
);

export default router;

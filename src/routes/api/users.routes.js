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
    const refs = req.files.map((file) => ({
      name: file.originalname,
      reference: `http://127.0.0.1:7071/uploads/${req.params.fileType}/${req.user.id}-${file.originalname}`,
    }));
    UserController.uploadDocuments(req.user.id, refs);
    res.json({ message: "File uploaded successfully", file: refs });
  }
);

export default router;

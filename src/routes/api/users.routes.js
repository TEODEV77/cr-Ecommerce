import { Router } from "express";
import { uploadFile } from "../../utils/multer.js";

import { Authenticate } from '../../config/middleware/passport.mid.js';

const router = Router();

router.post('/:id/documents/:fileType', Authenticate('jwt') ,uploadFile(), (req, res) => {
    res.json({ message: "File uploaded successfully", file: req.files});
});


export default router;
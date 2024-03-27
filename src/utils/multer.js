import fs from "fs";
import multer from "multer";

import {allowedDirectories} from '../utils/allowedDirectories.js';

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { fileType } = req.params;
      const allowedDirs = allowedDirectories(fileType);
      if(!allowedDirs) return cb(new Error("Invalid file type"));
      const path = "./public/uploads";
      let destination = `${path}/${fileType}`;
      fs.mkdirSync(destination, { recursive: true });
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const filePath = `${req.user.id}-${file.originalname}`;
      cb(null, filePath);
    },
  });

  const upload = multer({ storage: storage }).array("file");

  return upload;
};

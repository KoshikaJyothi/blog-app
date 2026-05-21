import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),

  // limit file size (2MB)
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  // file type validation
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      const err = new Error("Only JPG and PNG files are allowed");
      err.status = 400;
      cb(err, false);
    }
  },
});

export default upload;
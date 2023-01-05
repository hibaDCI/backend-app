import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/images",
  limits: {fieldSize: 50000},
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;

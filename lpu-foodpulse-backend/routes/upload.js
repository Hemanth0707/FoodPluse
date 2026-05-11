const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const fs = require('fs');

// Setup Multer Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\\s/g, '_')}`);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|mp4/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and MP4 Videos only!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', upload.single('proof'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the relative URL
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

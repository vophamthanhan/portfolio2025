import { Router } from "express";
import multer from "multer";
import { storagePut } from "./storage";
import { randomUUID } from "crypto";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
      return;
    }
    cb(null, true);
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate unique filename
    const ext = req.file.originalname.split(".").pop();
    const filename = `${randomUUID()}.${ext}`;
    const key = `portfolio/${filename}`;

    // Upload to S3
    const result = await storagePut(key, req.file.buffer, req.file.mimetype);

    res.json({
      success: true,
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;


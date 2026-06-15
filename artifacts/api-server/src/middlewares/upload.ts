import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "techtitans-uploads",
    // Allow images and documents (PDFs)
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
  } as any,
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
  },
});

import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// In development, we can fallback, but in production we want to ensure these are set
if (!cloudName || !apiKey || !apiSecret) {
  console.warn("WARNING: Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not fully configured. File uploads might fail.");
}

cloudinary.config({
  cloud_name: cloudName || "",
  api_key: apiKey || "",
  api_secret: apiSecret || "",
  secure: true,
});

export default cloudinary;

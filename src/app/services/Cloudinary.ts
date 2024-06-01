import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { config } from "dotenv";
import fs from "fs";
const env = process.env.NODE_ENV || "development";

config({
  path: `.env.${env}`,
});
class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImages(file: any[] | null) {
    if (!file) return null;
    try {
      if (!Array.isArray(file)) {
        file = [file];
      }

      const result = await Promise.all(
        file?.map(async (file) => {
          const res = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Intidev/knowledges",
          });
          return res;
        })
      );
      file?.map((file) => {
        fs.unlinkSync(file.tempFilePath);
      });

      return result;
    } catch (error) {
      return error;
    }
  }
  async deleteImages(publicId: string[]) {
    try {
      const result = Promise.all(
        publicId.map(async (publicId) => {
          await cloudinary.uploader.destroy(publicId);
        })
      );

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new CloudinaryService();

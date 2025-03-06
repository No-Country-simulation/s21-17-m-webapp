import axios from "axios";
import { getEnvVariables } from "../constants/getEnvVariables";
const { VITE_CLOUDINARY_NAME, VITE_CLOUDINARY_PRESET } = getEnvVariables();
const uploadImageToCloudinary = async (file, folder = "default_folder") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${VITE_CLOUDINARY_PRESET}`);
  formData.append("folder", folder);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error al subir la imagen");
    }

    return response.data.secure_url;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default uploadImageToCloudinary;

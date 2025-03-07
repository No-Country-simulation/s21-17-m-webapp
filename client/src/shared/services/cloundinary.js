import axios from "axios";
import { getEnvVariables } from "../constants/getEnvVariables";
import { v4 as uuidv4 } from "uuid"; // Importar uuid

const { VITE_CLOUDINARY_NAME, VITE_CLOUDINARY_PRESET } = getEnvVariables();

const uploadImageToCloudinary = async (file, folder = "default_folder", imageName = null) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${VITE_CLOUDINARY_PRESET}`);
  formData.append("folder", folder);

  const uniqueId = uuidv4();
  const finalImageName = imageName ? `${imageName}_${uniqueId}` : null;
  if (finalImageName) {
    formData.append("public_id", finalImageName);
  }

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
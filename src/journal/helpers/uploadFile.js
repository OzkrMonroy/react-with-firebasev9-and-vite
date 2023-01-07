import { getEnvironments } from "./getEnvironments";

export const uploadFile = async (file) => {
  if (!file) return null;

  const env = getEnvironments();
  const url = env.VITE_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const resp = await fetch(url, { method: "POST", body: formData });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    }
    return null;
  } catch (error) {
    console.log("Upload error", error);
    return null;
  }
};

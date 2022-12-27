export const uploadFile = async (file) => {
  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const resp = await fetch(url, { method: "POST", body: formData });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    }
    throw await resp.json();
  } catch (error) {
    console.log("Upload error", error);
  }
};

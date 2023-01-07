import { uploadFile } from "../../../src/journal/helpers/uploadFile";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
  secure: true,
});

xdescribe("UploadFile tests", () => {
  test("should upload the file", async () => {
    const resp = await fetch(
      "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
    );
    const blob = await resp.blob();
    const file = new File([blob], "test.jpg");

    const url = await uploadFile(file);
    console.log({ url });
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const { deleted } = await cloudinary.api.delete_resources(imageId);
    expect(deleted).toEqual({ [imageId]: "deleted" });
  }, 6000);

  test("should return an error", async () => {
    const file = new File([], "test.jpg");

    const url = await uploadFile(file);
    expect(url).toBe(null);
  });
});

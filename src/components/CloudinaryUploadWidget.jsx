import React from "react";

const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

export default function CloudinaryUploadWidget({
  onUpload,
  label = "Upload Media",
}) {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        urls.push(data.secure_url);
      }
    }
    onUpload(urls);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="w-full px-4 py-2 rounded border border-gray-300 bg-white"
      />
    </div>
  );
}

"use client";
import React, { useState } from "react";

function ImageSelection({ selectedFile }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const onFileSelected = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // 🔥 부모로 파일 전달
      selectedFile(file);
    }
  };

  return (
    <div>
      <label>
        <strong>Select Image of your room</strong>
      </label>

      <div>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={onFileSelected}
        />
      </div>

      {selectedImage && (
        <div style={{ marginTop: "20px", maxWidth: "500px" }}>
          <img
            src={selectedImage}
            alt="Selected room"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageSelection;
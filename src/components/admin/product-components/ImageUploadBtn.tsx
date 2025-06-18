'use client'
import React from 'react'
import { FiUpload } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ImageUploadBtnProps {
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploadBtn: React.FC<ImageUploadBtnProps> = ({ onImageSelect }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        setIsUploading(true);
        const file = event.target.files?.[0];
        if (!file) return;
    
        if (!["image/jpeg", "image/jpg"].includes(file.type)) {
          alert("Only JPG images are allowed.");
          return;
        }
    
        // Resize the image
        const resizedBlob = await resizeImage(file);
        const resizedFile = new File([resizedBlob], file.name, { type: "image/jpeg" });
    
        // Create a preview
        const previewUrl = URL.createObjectURL(resizedFile);
        setPreview(previewUrl);
    
        // Upload to Firebase
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, resizedFile);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        
        // Pass the Firebase URL to parent component
        onImageSelect(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
  
    // Image resizing function
    const resizeImage = (file: File, maxWidth = 800, maxHeight = 800): Promise<Blob> => {
      return new Promise((resolve) => {
        const img = document.createElement("img"); // Correct way in TypeScript
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          let width = img.width;
          let height = img.height;
  
          // Scale image while maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
  
          // Resize image on canvas
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
  
          // Convert canvas to Blob (compressed JPEG)
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, "image/jpeg", 0.8); // 80% quality
        };
      });
    };
  
    return (
      <div className="p-4 border rounded-md w-72 text-center">
        <input
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={handleFileChange}
          id="fileInput"
          className="hidden"
          disabled={isUploading}
        />
  
        <label
          htmlFor="fileInput"
          className={`cursor-pointer flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100 transition ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? (
            <span>Uploading...</span>
          ) : preview ? (
            <Image src={preview} alt="Preview" width={100} height={100} className="rounded" />
          ) : (
            <>
              <FiUpload className="w-8 h-8 text-gray-500" /> 
              <span className="text-gray-600 mt-2">Click to Upload</span>
            </>
          )}
        </label>
      </div>
    );
};

export default ImageUploadBtn;
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from '@/lib/firebase';

export const uploadProductImage = async (file: File) => {
  if (!file) return null;

  const fileName = `products/${Date.now()}-${file.name}`; // Unique filename
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file); // Upload to Firebase Storage
  const imageUrl = await getDownloadURL(storageRef); // Get URL

  return imageUrl; // ✅ Store this in the database
};

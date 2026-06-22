import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 5, // Batas maksimal 5MB
    maxWidthOrHeight: 4096, // Ubah ke resolusi yang lebih tinggi (contoh: 4K)
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    // If the "compressed" file is larger, use the original (happens with already tiny images)
    return compressedFile.size < file.size ? compressedFile : file;
  } catch (error) {
    console.error("Error compressing image:", error);
    return file; // Fallback to original file
  }
}

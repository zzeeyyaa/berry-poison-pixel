import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from '@/src/utils/cropImage';

interface ImageCropperModalProps {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onClose: () => void;
}

export default function ImageCropperModal({ imageSrc, onCropComplete, onClose }: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
      alert("Gagal memproses gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 touch-none overscroll-none">
      <div className="bg-[#FFFDFD] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-[#4E3C44]/10">
          <h3 className="font-black text-sm uppercase text-[#4E3C44]">Sesuaikan Gambar</h3>
          <p className="text-[10px] font-bold text-[#4E3C44]/50">Geser dan perbesar untuk memotong (Rasio 1:1)</p>
        </div>
        
        <div className="relative w-full h-[300px] md:h-[400px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-black uppercase text-[#4E3C44] mb-2 block">Zoom</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[#D9455B]"
            />
          </div>
          
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-gray-100 text-[#4E3C44] hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className={`px-4 py-2 rounded-xl font-black text-xs text-white bg-[#D9455B] shadow-[0_3px_0_#9C3040] hover:bg-[#C23A4E] hover:translate-y-[2px] hover:shadow-none transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Memproses...' : 'Simpan Crop'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

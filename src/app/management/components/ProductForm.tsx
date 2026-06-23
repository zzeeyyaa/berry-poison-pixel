import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { DBCategory, DBProduct } from "../types";
import { compressImage } from "@/src/utils/imageCompression";
import ImageCropperModal from "./ImageCropperModal";
import { saveProductAction } from "@/src/actions/products";

export interface ProductFormProps {
  dbCategories: DBCategory[];
  onRefresh: () => void;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
  editingProduct: DBProduct | null;
  onClose: () => void;
}

export default function ProductForm({
  dbCategories,
  onRefresh,
  onError,
  onSuccess,
  editingProduct,
  onClose,
}: ProductFormProps) {
  const supabase = createClient();
  const [name, setName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [price, setPrice] = useState<number>(0);
  const [dialogText, setDialogText] = useState<string>("");
  const [shopeeLink, setShopeeLink] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState<string>("");
  
  const [statBoost, setStatBoost] = useState<string>("");
  const [statBoostLevel, setStatBoostLevel] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageToCropSrc, setImageToCropSrc] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setSelectedCategoryId(editingProduct.category_id || "");
      setPrice(Number(editingProduct.price || 0));
      setDialogText(editingProduct.review || "");
      setShopeeLink(editingProduct.product_link || "");
      setFeatured(!!editingProduct.featured);
      setVideoLink(editingProduct.video_link || "");
      setStatBoost(editingProduct.statBoost || "");
      setStatBoostLevel(editingProduct.statBoostLevel || 1);
      setImageFile(null);
      setImageToCropSrc(null);
    } else {
      clearForm();
    }
  }, [editingProduct]);

  useEffect(() => {
    if (!editingProduct && dbCategories.length > 0 && selectedCategoryId === "") {
      setSelectedCategoryId(dbCategories[0].id);
    }
  }, [dbCategories, editingProduct, selectedCategoryId]);

  const clearForm = () => {
    setName("");
    if (dbCategories.length > 0) {
      setSelectedCategoryId(dbCategories[0].id);
    } else {
      setSelectedCategoryId("");
    }
    setPrice(0);
    setDialogText("");
    setShopeeLink("");
    setFeatured(false);
    setVideoLink("");
    setStatBoost("");
    setStatBoostLevel(1);
    setImageFile(null);
    setImageToCropSrc(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    if (!name || !shopeeLink || !dialogText || !selectedCategoryId) {
      onError("Nama, Kategori, Link Shopee, dan Ulasan wajib diisi!");
      return;
    }

    let uploadedImageUrl = editingProduct?.image_url || null;

    try {
      if (imageFile) {
        setUploadingImage(true);
        const compressedFile = await compressImage(imageFile);
        const fileExt = compressedFile.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('image_url')
          .upload(fileName, compressedFile);

        setUploadingImage(false);

        if (uploadError) {
          throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('image_url')
          .getPublicUrl(fileName);
        
        uploadedImageUrl = publicUrl;

        // Hapus gambar lama dari storage jika ada
        if (editingProduct?.image_url) {
          try {
            const oldUrlParts = editingProduct.image_url.split('/public/image_url/');
            if (oldUrlParts.length > 1) {
              const oldFileName = oldUrlParts[1];
              await supabase.storage.from('image_url').remove([oldFileName]);
            }
          } catch (deleteErr) {
            console.error("Gagal menghapus gambar lama:", deleteErr);
          }
        }
      }

      const payload = {
        name,
        price: String(price),
        product_link: shopeeLink,
        review: dialogText,
        featured,
        video_link: videoLink || null,
        category_id: Number(selectedCategoryId),
        statboost: statBoost || null,
        statboostlevel: Number(statBoostLevel) || 1,
        image_url: uploadedImageUrl,
      };

      await saveProductAction(payload, editingProduct?.id || undefined);

      if (editingProduct) {
        onSuccess("Produk berhasil diperbarui!");
      } else {
        onSuccess("Produk baru berhasil ditambahkan!");
        clearForm();
      }
      onClose();
      onRefresh();
      
      const fileInput = document.getElementById('image-upload-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      setUploadingImage(false);
      console.error(err);
      onError(err.message || "Gagal menyimpan data.");
    }
  };

  return (
    <div className="bg-[#FCF8F7] border border-[#4E3C44]/8 rounded-2xl p-5 sm:p-6 shadow-2xl animate-modal relative max-h-[90vh] overflow-y-auto w-full max-w-2xl mx-auto overflow-hidden">
      
      {/* Header Modal - Rosy Espresso & Strawberry Theme */}
      <div className="bg-gradient-to-r from-[#4E3C44] via-[#9C3040] to-[#D9455B] text-[#FFFDFD] -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 px-5 sm:px-6 py-3 mb-4 rounded-t-2xl relative shadow-sm border-b border-[#D9455B]/20">
        <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase">
          {editingProduct ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <button 
          onClick={onClose}
          className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#D9455B] text-[#F3E2DC] transition-colors focus:outline-none"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Mechanical Keyboard Retro"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Kategori
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all shadow-sm"
            >
              <option value="" disabled>Pilih Kategori...</option>
              {dbCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Harga (IDR)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="150000"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Link Produk Shopee
            </label>
            <input
              type="text"
              value={shopeeLink}
              onChange={(e) => setShopeeLink(e.target.value)}
              placeholder="https://shopee.co.id/..."
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 border-t border-[#D9455B]/10 pt-3 mt-1">
          <div className="sm:col-span-5">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Gambar Asli
            </label>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-2">
                {editingProduct?.image_url && !imageFile && (
                  <img src={editingProduct.image_url} alt="Current" className="h-8 w-8 object-cover rounded shadow-sm border border-[#4E3C44]/20" />
                )}
                {imageFile && (
                  <img src={URL.createObjectURL(imageFile)} alt="New Preview" className="h-8 w-8 object-cover rounded shadow-sm border border-[#4E3C44]/20" />
                )}
                <label className="cursor-pointer px-3 py-1.5 bg-[#4E3C44] border border-[#2B2125] text-[#F3E2DC] hover:bg-[#D9455B] hover:border-[#9C3040] hover:text-[#FFFDFD] transition-colors rounded-lg text-[10px] font-black shrink-0 shadow-[0_2px_0_#2B2125] hover:shadow-none hover:translate-y-[2px]">
                  {imageFile ? 'Ganti File' : 'Upload File'}
                  <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImageToCropSrc(url);
                      }
                      e.target.value = '';
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="text-[9px] font-bold text-[#4E3C44]/50 truncate max-w-[150px] pl-1">
                {imageFile ? imageFile.name : '*Opsional, default icon'}
              </span>
            </div>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Teks Stat Boost
            </label>
            <input
              type="text"
              value={statBoost}
              onChange={(e) => setStatBoost(e.target.value)}
              placeholder="Contoh: Aesthetic"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Level
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={statBoostLevel}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= 100) setStatBoostLevel(val);
              }}
              placeholder="100"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all text-center placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div className="sm:col-span-8">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Link Video (Opsional)
            </label>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div className="sm:col-span-4 flex items-center pt-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                id="featured-checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#D9455B] bg-[#FFFDFD] border-[#4E3C44]/20 rounded focus:ring-[#D9455B] focus:ring-offset-0 cursor-pointer transition-colors"
              />
              <span className="text-[10px] font-black text-[#4E3C44] uppercase select-none group-hover:text-[#D9455B] transition-colors">
                Produk Unggulan
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-[#D9455B]/10 pt-3 mt-1">
          <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
            Review Produk
          </label>
          <textarea
            value={dialogText}
            onChange={(e) => setDialogText(e.target.value)}
            rows={3}
            placeholder="Tulis ulasan produk di sini..."
            className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-3 text-xs font-bold text-[#4E3C44] leading-relaxed focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all resize-none placeholder-[#4E3C44]/30 shadow-sm"
          />
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all duration-200 border-2 border-[#4E3C44]/10 text-[#4E3C44]/70 hover:bg-[#FADCDA]/40 hover:border-[#FADCDA] hover:text-[#D9455B]"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={uploadingImage}
            className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all duration-200 shadow-[0_4px_0_#9C3040] translate-y-[-2px] active:shadow-none active:translate-y-0 text-[#FFFDFD] bg-[#D9455B] hover:bg-[#C23A4E] ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploadingImage ? "Mengunggah..." : editingProduct ? "Simpan" : "Tambah Item"}
          </button>
        </div>
      </form>
      
      {/* Crop Modal */}
      {imageToCropSrc && (
        <ImageCropperModal
          imageSrc={imageToCropSrc}
          onClose={() => {
            setImageToCropSrc(null);
            URL.revokeObjectURL(imageToCropSrc);
          }}
          onCropComplete={(croppedFile) => {
            setImageFile(croppedFile);
            setImageToCropSrc(null);
            URL.revokeObjectURL(imageToCropSrc);
          }}
        />
      )}
    </div>
  );
}

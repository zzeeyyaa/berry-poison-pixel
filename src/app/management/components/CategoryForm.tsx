import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { DBCategory } from "../types";

export interface CategoryFormProps {
  onRefresh: () => void;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
  editingCategory: DBCategory | null;
  onClose: () => void;
}

export default function CategoryForm({
  onRefresh,
  onError,
  onSuccess,
  editingCategory,
  onClose,
}: CategoryFormProps) {
  const supabase = createClient();
  const [catName, setCatName] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const [catIcon, setCatIcon] = useState<string>("");

  useEffect(() => {
    if (editingCategory) {
      setCatName(editingCategory.name);
      setCatSlug(editingCategory.slug);
      setCatIcon(editingCategory.icon);
    } else {
      clearCategoryForm();
    }
  }, [editingCategory]);

  const clearCategoryForm = () => {
    setCatName("");
    setCatSlug("");
    setCatIcon("");
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    if (!catName || !catSlug || !catIcon) {
      onError("Nama Kategori, Slug, dan Icon wajib diisi!");
      return;
    }

    const payload = {
      name: catName,
      slug: catSlug.toLowerCase().replace(/\s+/g, "-"),
      icon: catIcon.toLowerCase(),
    };

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editingCategory.id);

        if (error) throw error;
        onSuccess("Kategori berhasil diperbarui!");
        onClose();
      } else {
        const { error } = await supabase.from("categories").insert([payload]);

        if (error) throw error;
        onSuccess("Kategori baru berhasil ditambahkan!");
        clearCategoryForm();
        onClose();
      }
      onRefresh();
    } catch (err: any) {
      console.error(err);
      onError(err.message || "Gagal menyimpan kategori ke Supabase.");
    }
  };

  return (
    <div className="bg-[#FCF8F7] border border-[#4E3C44]/8 rounded-2xl p-5 sm:p-6 shadow-2xl animate-modal relative max-h-[90vh] overflow-y-auto w-full max-w-xl mx-auto overflow-hidden">
      
      {/* Header Modal - Rosy Espresso & Strawberry Theme */}
      <div className="bg-gradient-to-r from-[#4E3C44] via-[#9C3040] to-[#D9455B] text-[#FFFDFD] -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 px-5 sm:px-6 py-3 mb-4 rounded-t-2xl relative shadow-sm border-b border-[#D9455B]/20">
        <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase">
          {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
        </h2>
        <button 
          onClick={onClose}
          className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#D9455B] text-[#F3E2DC] transition-colors focus:outline-none"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleCategorySubmit} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Nama Kategori
            </label>
            <input
              type="text"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="Contoh: Desk Setup"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Slug (URL)
            </label>
            <input
              type="text"
              value={catSlug}
              onChange={(e) => setCatSlug(e.target.value)}
              placeholder="Contoh: desk-setup"
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/30 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#4E3C44] uppercase mb-1 tracking-wide">
              Ikon Art Default
            </label>
            <select
              value={catIcon}
              onChange={(e) => setCatIcon(e.target.value)}
              className="w-full bg-[#FFFDFD] border border-[#4E3C44]/10 rounded-xl p-2.5 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all shadow-sm"
            >
              <option value="" disabled>Pilih Jenis Ikon...</option>
              <option value="keyboard">Keyboard</option>
              <option value="hoodie">Hoodie</option>
              <option value="console">Console</option>
              <option value="deskmat">Deskmat</option>
              <option value="glasses">Glasses</option>
              <option value="keychain">Keychain</option>
              <option value="mug">Mug</option>
              <option value="clock">Clock</option>
              <option value="bottle">Bottle</option>
              <option value="capsule">Capsule</option>
              <option value="softgel">Softgel</option>
              <option value="jar">Jar</option>
              <option value="makeup">Makeup</option>
              <option value="lipcare">Lipcare</option>
              <option value="buku">Buku</option>
              <option value="skincare">Skincare</option>
              <option value="bodycare">Bodycare</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-3 border-t border-[#D9455B]/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all duration-200 border-2 border-[#4E3C44]/10 text-[#4E3C44]/70 hover:bg-[#FADCDA]/40 hover:border-[#FADCDA] hover:text-[#D9455B]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all duration-200 shadow-[0_4px_0_#9C3040] translate-y-[-2px] active:shadow-none active:translate-y-0 text-[#FFFDFD] bg-[#D9455B] hover:bg-[#C23A4E]"
          >
            {editingCategory ? "Simpan" : "Tambah Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
}

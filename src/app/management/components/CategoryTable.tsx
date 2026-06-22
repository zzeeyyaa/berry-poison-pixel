import React from "react";
import { DBCategory } from "../types";
import { ItemIcon } from "@/src/utils/pixelArt/GenerateIconPixel";

export interface CategoryTableProps {
  categories: DBCategory[];
  loading: boolean;
  onEdit: (category: DBCategory) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: CategoryTableProps) {
  return (
    <div className="bg-white border border-[#4E3C44]/8 rounded-2xl shadow-sm overflow-hidden mt-6 relative z-0">
      <div className="p-3 sm:p-5 border-b border-[#4E3C44]/5 bg-[#FCF8F7] flex justify-between items-center gap-2">
        <h2 className="text-xs sm:text-sm font-extrabold text-[#4E3C44] flex items-center gap-1.5 sm:gap-2">
          <span>🏷️</span> <span className="hidden sm:inline">Daftar Kategori Supabase</span><span className="sm:hidden">Kategori</span>
        </h2>
        <button
          onClick={onAdd}
          className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[#D9455B] text-[#FFFDFD] text-[10px] sm:text-xs font-bold rounded-lg shadow-[0_3px_0_#9C3040] hover:bg-[#C23A4E] hover:translate-y-[-1px] active:shadow-none active:translate-y-[2px] transition-all flex-shrink-0"
        >
          ✨ Tambah <span className="hidden sm:inline">Kategori</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs font-bold text-[#4E3C44]/40 animate-pulse">
          ⏳ Memuat data dari Supabase...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-xs font-bold text-[#4E3C44]/40">
          Belum ada kategori di database.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-[#4E3C44]">
            <thead>
              <tr className="bg-[#FFFDFD] border-b border-[#4E3C44]/10 text-[9px] sm:text-[10px] text-[#4E3C44]/50 uppercase tracking-widest">
                <th className="py-3 px-3 sm:py-4 sm:px-6 font-black w-1/2 sm:w-2/5">Nama Kategori</th>
                <th className="py-3 px-3 sm:py-4 sm:px-4 font-black hidden sm:table-cell w-1/4">Slug</th>
                <th className="py-3 px-3 sm:py-4 sm:px-4 font-black w-1/4">Ikon Art</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-right font-black">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4E3C44]/5">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FCF8F7]/50 transition-colors group">
                  <td className="py-3 px-3 sm:py-4 sm:px-6 font-extrabold max-w-[150px] sm:max-w-[200px] truncate text-[10px] sm:text-xs">
                    {cat.name}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4 font-mono text-[9px] sm:text-[10px] text-[#4E3C44]/70 hidden sm:table-cell">
                    /{cat.slug}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#FFFDFD] rounded-lg border border-[#4E3C44]/10 shrink-0 shadow-sm">
                        <ItemIcon type={cat.icon || "default"} className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-1 sm:px-2.5 sm:py-1 bg-[#F3E2DC]/50 text-[#4E3C44] rounded-md font-black text-[8px] sm:text-[9px] uppercase tracking-wide border border-[#4E3C44]/10">
                        {cat.icon || "default"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-right flex gap-1 sm:gap-2 justify-end opacity-100 sm:opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(cat)}
                      className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#F3E2DC]/50 text-[#4E3C44] hover:bg-[#E6C2BB] hover:text-[#4E3C44] transition-all font-bold shadow-sm flex items-center gap-1 text-[10px] sm:text-xs"
                      title="Edit"
                    >
                      ✏️ <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(cat.id)}
                      className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-transparent text-[#4E3C44]/50 hover:bg-[#FFF0EF] hover:text-[#D9455B] hover:border-[#FADCDA] transition-all font-bold text-[10px] sm:text-xs"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

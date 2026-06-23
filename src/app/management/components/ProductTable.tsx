import React from "react";
import { DBProduct, DBCategory } from "../types";
import { ItemIcon } from "@/src/utils/pixelArt/GenerateIconPixel";

export interface ProductTableProps {
  products: DBProduct[];
  loading: boolean;
  onEdit: (product: DBProduct) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  dbCategories: DBCategory[];
  selectedCategoryFilter: number | "";
  onCategoryFilterChange: (id: number | "") => void;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
  onAdd,
  searchQuery,
  onSearchChange,
  dbCategories,
  selectedCategoryFilter,
  onCategoryFilterChange,
}: ProductTableProps) {
  return (
    <div className="bg-white border border-[#4E3C44]/8 rounded-2xl shadow-sm overflow-hidden relative z-0">
      <div className="p-3 sm:p-5 border-b border-[#4E3C44]/5 bg-[#FCF8F7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <h2 className="text-xs sm:text-sm font-extrabold text-[#4E3C44] flex items-center gap-1.5 sm:gap-2">
            <span>📦</span> <span className="hidden sm:inline">Daftar Produk Supabase</span><span className="sm:hidden">Produk</span>
          </h2>
          <button
            onClick={onAdd}
            className="sm:hidden px-2.5 py-1.5 bg-[#D9455B] text-[#FFFDFD] text-[10px] font-bold rounded-lg shadow-[0_3px_0_#9C3040] hover:bg-[#C23A4E] active:shadow-none active:translate-y-[2px] transition-all flex-shrink-0"
          >
            ✨ Tambah
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[150px] sm:w-48">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-[#4E3C44]/10 rounded-xl pl-8 pr-8 py-2 text-[10px] sm:text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all placeholder-[#4E3C44]/35 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#4E3C44]/40 hover:text-[#D9455B] transition-colors focus:outline-none"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Select */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value === "" ? "" : Number(e.target.value))}
            className="bg-white border border-[#4E3C44]/10 rounded-xl px-2.5 py-2 text-[10px] sm:text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] transition-all shadow-sm cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            {dbCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={onAdd}
            className="hidden sm:inline-block px-4 py-2 bg-[#D9455B] text-[#FFFDFD] text-xs font-bold rounded-lg shadow-[0_3px_0_#9C3040] hover:bg-[#C23A4E] hover:translate-y-[-1px] active:shadow-none active:translate-y-[2px] transition-all flex-shrink-0"
          >
            ✨ Tambah Produk
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs font-bold text-[#4E3C44]/40 animate-pulse">
          ⏳ Memuat data dari Supabase...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-xs font-bold text-[#4E3C44]/40">
          Belum ada produk di database. Isi form di atas untuk menambahkan.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-[#4E3C44]">
            <thead>
              <tr className="bg-[#FFFDFD] border-b border-[#4E3C44]/10 text-[9px] sm:text-[10px] text-[#4E3C44]/50 uppercase tracking-widest">
                <th className="py-3 px-3 sm:py-4 sm:px-6 font-black">Nama Produk</th>
                <th className="py-3 px-3 sm:py-4 sm:px-4 font-black hidden sm:table-cell">Kategori</th>
                <th className="py-3 px-3 sm:py-4 sm:px-4 font-black">Harga (IDR)</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-right font-black">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4E3C44]/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#FCF8F7]/50 transition-colors group">
                  <td className="py-3 px-3 sm:py-4 sm:px-6 font-extrabold max-w-[140px] sm:max-w-[220px] truncate flex items-center gap-2 sm:gap-3">
                    {product.image_url ? (
                      <img src={product.image_url} alt="thumbnail" className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-md object-cover border border-[#4E3C44]/10 shadow-sm" />
                    ) : (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-md bg-[#F3E2DC] flex items-center justify-center border border-[#4E3C44]/5 shadow-sm text-sm sm:text-lg overflow-hidden">
                        <ItemIcon type={product.iconType as any} className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                    )}
                    <span className="truncate text-[10px] sm:text-xs" title={product.name}>{product.name}</span>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell">
                    <span className="px-2 py-1 sm:px-2.5 bg-[#FADCDA]/40 text-[#D9455B] rounded-md font-black text-[8px] sm:text-[9px] uppercase tracking-wide border border-[#D9455B]/10">
                      {product.category_name}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4 font-bold text-[#4E3C44]/80 text-[10px] sm:text-xs whitespace-nowrap">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-right flex gap-1 sm:gap-2 justify-end opacity-100 sm:opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#F3E2DC]/50 text-[#4E3C44] hover:bg-[#E6C2BB] hover:text-[#4E3C44] transition-all font-bold shadow-sm flex items-center gap-1 text-[10px] sm:text-xs"
                      title="Edit"
                    >
                      ✏️ <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
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

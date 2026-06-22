"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";
import { toast } from "sonner";
import { DBCategory, DBProduct } from "./types";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";

import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [paginatedCategories, setPaginatedCategories] = useState<DBCategory[]>([]);
  const [allCategories, setAllCategories] = useState<DBCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination states
  const [productPage, setProductPage] = useState(1);
  const [productTotal, setProductTotal] = useState(0);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const PAGE_SIZE = 10;

  // Editing states
  const [editingProduct, setEditingProduct] = useState<DBProduct | null>(null);
  const [editingCategory, setEditingCategory] = useState<DBCategory | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Confirm dialog state
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => { },
  });

  // Fetch all categories for the dropdown in ProductForm
  const fetchAllCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true });
    if (!error && data) setAllCategories(data);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const from = (productPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data: prodData, error: prodError, count } = await supabase
        .from("products")
        .select(`
          id, name, price, product_link, review, featured, video_link, category_id, statboost, statboostlevel, image_url,
          categories (name, icon)
        `, { count: "exact" })
        .order("id", { ascending: false })
        .range(from, to);

      if (prodError) throw prodError;
      if (count !== null) setProductTotal(count);

      if (prodData) {
        const mapped: DBProduct[] = prodData.map((item: any) => ({
          id: String(item.id),
          name: item.name || "",
          price: Number(item.price || 0),
          product_link: item.product_link || "",
          review: item.review || "",
          featured: !!item.featured,
          video_link: item.video_link || null,
          category_id: Number(item.category_id || 0),
          category_name: item.categories?.name || "Unknown",
          statBoost: item.statboost || "",
          statBoostLevel: Number(item.statboostlevel || 1),
          image_url: item.image_url || null,
          iconType: item.categories?.icon || "keyboard",
        }));
        setProducts(mapped);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengambil data produk.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const from = (categoryPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data: catData, error: catError, count } = await supabase
        .from("categories")
        .select("*", { count: "exact" })
        .order("id", { ascending: false })
        .range(from, to);

      if (catError) throw catError;
      if (count !== null) setCategoryTotal(count);
      if (catData) setPaginatedCategories(catData);
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengambil data kategori.");
    } finally {
      setLoading(false);
    }
  };

  const refetchCurrentTab = () => {
    fetchAllCategories();
    if (activeTab === "products") fetchProducts();
    else fetchCategories();
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    } else {
      fetchCategories();
    }
  }, [activeTab, productPage, categoryPage]);

  const handleEditProduct = (product: DBProduct) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleEditCategory = (category: DBCategory) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: "Hapus Produk",
      description: "Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.",
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        try {
          const { error } = await supabase.from("products").delete().eq("id", id);
          if (error) throw error;
          toast.success("Produk berhasil dihapus!");
          refetchCurrentTab();
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || "Gagal menghapus data.");
        }
      },
    });
  };

  const handleDeleteCategory = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: "Hapus Kategori",
      description: "Menghapus kategori akan menghapus SEMUA produk di dalamnya secara permanen. Apakah Anda yakin?",
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        try {
          const { error } = await supabase.from("categories").delete().eq("id", id);
          if (error) throw error;
          toast.success("Kategori dan produk terkait berhasil dihapus!");
          refetchCurrentTab();
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || "Gagal menghapus kategori.");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF7F5] py-8 px-4 font-sans select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <header className="flex justify-between items-center bg-white border border-[#4E3C44]/8 rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/strawberry.svg" alt="Zia Pixel" className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" />
            <span className="font-black text-[#4E3C44] text-[11px] sm:text-base leading-none">
              Zia Pixel <span className="hidden sm:inline">Management</span>
            </span>
          </div>
          <Link 
            href="/"
            className="category-tab-btn category-tab-btn-espresso font-bold text-[10px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1"
          >
            <span className="sm:hidden">🏠</span>
            <span className="hidden sm:inline">← Kembali ke Toko</span>
          </Link>
        </header>

        {/* Tab Controls */}
        <div className="flex justify-center mb-2">
          <div className="flex w-full sm:w-auto gap-1 p-1.5 bg-[#FCF8F7] border border-[#4E3C44]/10 rounded-xl shadow-inner relative z-10">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 sm:flex-none px-3 py-2 sm:px-6 sm:py-2.5 font-bold transition-all duration-300 text-[10px] sm:text-xs rounded-lg flex justify-center items-center gap-1.5 sm:gap-2 ${
                activeTab === "products" 
                  ? "bg-[#D9455B] text-[#FFFDFD] shadow-[0_4px_0_#9C3040] translate-y-[-2px]" 
                  : "text-[#4E3C44]/60 hover:text-[#4E3C44] hover:bg-[#FADCDA]/30"
              }`}
            >
              <span className="text-sm sm:text-base">📦</span> <span className="hidden sm:inline">Kelola </span>Produk
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex-1 sm:flex-none px-3 py-2 sm:px-6 sm:py-2.5 font-bold transition-all duration-300 text-[10px] sm:text-xs rounded-lg flex justify-center items-center gap-1.5 sm:gap-2 ${
                activeTab === "categories" 
                  ? "bg-[#4E3C44] text-[#F3E2DC] shadow-[0_4px_0_#2B2125] translate-y-[-2px]" 
                  : "text-[#4E3C44]/60 hover:text-[#4E3C44] hover:bg-[#FADCDA]/30"
              }`}
            >
              <span className="text-sm sm:text-base">🏷️</span> <span className="hidden sm:inline">Kelola </span>Kategori
            </button>
          </div>
        </div>

        {/* ==================== PRODUCTS TAB ==================== */}
        {activeTab === "products" && (
          <>
              <div className="flex flex-col gap-3">
                <ProductTable
                  products={products}
                  loading={loading}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onAdd={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                />
                
                {/* Product Pagination Controls */}
                {productTotal > PAGE_SIZE && (
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#4E3C44]/8 shadow-sm">
                    <button
                      onClick={() => setProductPage(p => Math.max(1, p - 1))}
                      disabled={productPage === 1}
                      className="px-4 py-2 bg-[#FCF8F7] text-[#4E3C44]/70 font-bold text-xs rounded-lg disabled:opacity-50 hover:bg-[#F3E2DC]"
                    >
                      ← Prev
                    </button>
                    <span className="text-xs font-bold text-[#4E3C44]/60">
                      Halaman {productPage} dari {Math.ceil(productTotal / PAGE_SIZE)}
                    </span>
                    <button
                      onClick={() => setProductPage(p => Math.min(Math.ceil(productTotal / PAGE_SIZE), p + 1))}
                      disabled={productPage >= Math.ceil(productTotal / PAGE_SIZE)}
                      className="px-4 py-2 bg-[#FCF8F7] text-[#4E3C44]/70 font-bold text-xs rounded-lg disabled:opacity-50 hover:bg-[#F3E2DC]"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

            {isProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4E3C44]/60 backdrop-blur-sm animate-fade-in">
                <ProductForm
                  dbCategories={allCategories}
                  onRefresh={refetchCurrentTab}
                  onError={(msg) => toast.error(msg)}
                  onSuccess={(msg) => toast.success(msg)}
                  editingProduct={editingProduct}
                  onClose={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(false);
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* ==================== CATEGORIES TAB ==================== */}
        {activeTab === "categories" && (
          <>
              <div className="flex flex-col gap-3">
                <CategoryTable
                  categories={paginatedCategories}
                  loading={loading}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                  onAdd={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                />

                {/* Category Pagination Controls */}
                {categoryTotal > PAGE_SIZE && (
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#4E3C44]/8 shadow-sm">
                    <button
                      onClick={() => setCategoryPage(p => Math.max(1, p - 1))}
                      disabled={categoryPage === 1}
                      className="px-4 py-2 bg-[#FCF8F7] text-[#4E3C44]/70 font-bold text-xs rounded-lg disabled:opacity-50 hover:bg-[#F3E2DC]"
                    >
                      ← Prev
                    </button>
                    <span className="text-xs font-bold text-[#4E3C44]/60">
                      Halaman {categoryPage} dari {Math.ceil(categoryTotal / PAGE_SIZE)}
                    </span>
                    <button
                      onClick={() => setCategoryPage(p => Math.min(Math.ceil(categoryTotal / PAGE_SIZE), p + 1))}
                      disabled={categoryPage >= Math.ceil(categoryTotal / PAGE_SIZE)}
                      className="px-4 py-2 bg-[#FCF8F7] text-[#4E3C44]/70 font-bold text-xs rounded-lg disabled:opacity-50 hover:bg-[#F3E2DC]"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

            {isCategoryModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4E3C44]/60 backdrop-blur-sm animate-fade-in">
                <CategoryForm
                  onRefresh={refetchCurrentTab}
                  onError={(msg) => toast.error(msg)}
                  onSuccess={(msg) => toast.success(msg)}
                  editingCategory={editingCategory}
                  onClose={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(false);
                  }}
                />
              </div>
            )}
          </>
        )}

      </div>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        description={confirmState.description}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

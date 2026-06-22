"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/src/types/product";
import ItemCard from "../components/ItemCard";
import AvatarStats from "../components/AvatarStats";
import ProductModal from "../components/ProductModal";
import { createClient } from "@/src/utils/supabase/client";
import { AuthButton } from "../components/authButton";
import WelcomeDialog from "../components/WelcomeDialog";

export default function Home() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Items"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);
  
  // Pagination States
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const PAGE_SIZE = 15;

  // 1. Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select("name").order("name", { ascending: true });
      if (!error && data) {
        setCategories(["All Items", ...data.map((c: any) => c.name)]);
      }
    }
    fetchCategories();
  }, []);

  // 2. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 3. Reset Pagination when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [selectedCategory, debouncedSearch]);

  // 4. Fetch Products (Pagination & Filter Server-Side)
  useEffect(() => {
    async function fetchProducts() {
      try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        let query = supabase
          .from("products")
          .select(`
            id, name, price, product_link, review, featured, video_link, category_id, statboost, statboostlevel, image_url,
            categories!inner(name, icon)
          `);

        if (selectedCategory !== "All Items") {
          query = query.eq("categories.name", selectedCategory);
        }

        if (debouncedSearch) {
          query = query.or(`name.ilike.%${debouncedSearch}%,review.ilike.%${debouncedSearch}%`);
        }

        const { data, error } = await query.range(from, to).order("id", { ascending: false });

        if (error) {
          console.error("Error fetching from supabase:", error);
          return;
        }

        if (data) {
          const mappedData: Product[] = data.map((item: any) => {
            const catObj = item.categories;
            const boostName = item.statboost || "Aesthetic";
            const boostLevel = item.statboostlevel || 1;

            return {
              id: String(item.id),
              name: item.name || "",
              category: (catObj?.name || "Accessories") as any,
              price: Number(item.price || 0),
              statBoost: `+${boostLevel} ${boostName}`,
              statBoostLevel: boostLevel,
              dialogText: item.review || "",
              shopeeLink: item.product_link || "",
              videoLink: item.video_link || null,
              iconType: (catObj?.icon || "keyboard") as any,
              imageUrl: item.image_url || null,
            };
          });

          if (page === 1) {
            setProducts(mappedData);
          } else {
            setProducts((prev) => {
              // Prevent duplicates in React 18 strict mode
              const existingIds = new Set(prev.map(p => p.id));
              const newItems = mappedData.filter(p => !existingIds.has(p.id));
              return [...prev, ...newItems];
            });
          }

          if (mappedData.length < PAGE_SIZE) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    // Only run if selectedCategory exists to avoid premature fetch
    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, debouncedSearch, page]);

  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Products are already filtered by the backend
  const sortedProducts = products;

  return (
    <div className="relative min-h-screen pb-16 flex flex-col font-sans select-none overflow-x-hidden">
      <WelcomeDialog />
      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-6 md:gap-8 z-10">

        {/* Compact Navbar Header Section */}
        <header className="bg-white border border-[#4E3C44]/8 rounded-full py-2 px-4 md:px-5 shadow-sm flex items-center justify-between select-none">
          <div className="flex items-center">
            {/* Tiny Pixel Strawberry Logo */}
            <img src="/strawberry.svg" alt="Strawberry Logo" className="w-6 h-6 mr-2 flex-shrink-0" style={{ imageRendering: "pixelated" }} />
            <span className="font-sans font-medium text-sm md:text-base text-[#4E3C44] tracking-wide">
              berry.poison<span className="font-black text-[#D9455B]">.pixel</span>
            </span>
          </div>

          {/* Subtle sublabel */}
          {/* <div className="text-[10px] font-bold text-[#759280] uppercase tracking-wider hidden sm:block">
            ☕ Curated Cozy Shopee Deals
          </div> */}
          <AuthButton></AuthButton>
        </header>

        {/* NPC Shopkeeper profile welcome block */}
        <section aria-label="Shopkeeper Status Panel" className="w-full">
          <AvatarStats />
        </section>

        {/* Inventory Separator Line */}
        <div className="flex items-center gap-1 select-none">
          <div className="h-[1.5px] bg-[#4E3C44]/10 flex-1" />
          <span className="font-sans text-[10px] font-bold text-[#4E3C44]/55 tracking-widest uppercase">
            📦 SHOP INVENTORY
          </span>
          <div className="h-[1.5px] bg-[#4E3C44]/10 flex-1" />
        </div>

        {/* Category Filter Tabs with Active Indicators & Search Bar */}
        <section aria-label="Product Filtering and Search" className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Category Filter Tabs */}
            <div className="flex flex-row overflow-x-auto no-scrollbar whitespace-nowrap gap-1.5 pb-1 -mx-4 px-4 select-none md:mx-0 md:px-0 md:flex-wrap md:overflow-x-visible">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`tab-${cat.toLowerCase().replace(" ", "-")}`}
                    onClick={() => handleTabClick(cat)}
                    className={`flex-shrink-0 category-tab-btn transition-all cursor-pointer ${isActive ? "category-tab-btn-cherry" : "category-tab-btn-espresso"
                      }`}
                  >
                    {isActive ? `● ${cat}` : cat}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64 flex-shrink-0 select-none">
              <div className="relative flex items-center">
                <svg
                  className="absolute left-3.5 w-3.5 h-3.5 text-[#4E3C44]/45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FCF8F7] text-[#4E3C44] text-[11px] font-bold pl-9 pr-8 py-1.5 border border-[#4E3C44]/10 rounded-full focus:outline-none focus:border-[#D9455B] focus:ring-1 focus:ring-[#D9455B] placeholder-[#4E3C44]/35 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 p-1 rounded-full text-[#4E3C44]/45 hover:text-[#D9455B] hover:bg-[#4E3C44]/5 transition-all cursor-pointer"
                    title="Clear search"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading && page === 1 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <span className="text-3xl animate-bounce">📦</span>
              <span className="text-sm font-bold text-[#4E3C44]/50">Membongkar kargo dari Supabase...</span>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <span className="text-3xl grayscale opacity-50">🍓</span>
              <span className="text-sm font-bold text-[#4E3C44]/50">Wah, barang yang dicari kosong.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {sortedProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ItemCard
                    product={product}
                    onOpenDetail={(prod) => setActiveProductForModal(prod)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && sortedProducts.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loadingMore}
                className="px-6 py-2.5 bg-[#FCF8F7] border-2 border-[#4E3C44]/10 text-[#4E3C44]/70 font-bold rounded-xl text-xs hover:bg-[#F3E2DC] hover:text-[#4E3C44] transition-all disabled:opacity-50"
              >
                {loadingMore ? "⏳ Memuat..." : "✨ Muat Lebih Banyak"}
              </button>
            </div>
          )}
        </section>

        {/* Footer credits */}
        <footer className="text-center text-espresso-plum/40 font-sans text-[10px] mt-10 select-none">
          <p>© 2026 Berry Poison Pixel Hub. All rights reserved.</p>
          <p className="mt-1">Crafted with Retro Pixel Accents • Styled for Conversions</p>
        </footer>
      </main>

      {/* Details Product Popup Modal */}
      {activeProductForModal && (
        <ProductModal
          product={activeProductForModal}
          onClose={() => setActiveProductForModal(null)}
        />
      )}
    </div>
  );
}

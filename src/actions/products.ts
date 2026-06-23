"use server";

import { createClient } from "@/src/utils/supabase/server";
import { DBProduct } from "@/src/app/management/types";

// Mengambil daftar produk berdasarkan halaman, pencarian, dan filter kategori
export async function fetchProductsAction(page: number, limit: number, search?: string, categoryId?: number | "") {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select(`
      id, name, price, product_link, review, featured, video_link, category_id, statboost, statboostlevel, image_url,
      categories (name, icon)
    `, { count: "exact" });

  if (search && search.trim() !== "") {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  if (categoryId !== undefined && categoryId !== "") {
    query = query.eq("category_id", categoryId);
  }

  const { data, error, count } = await query
    .order("id", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const mapped: DBProduct[] = (data || []).map((item: any) => ({
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

  return { products: mapped, total: count || 0 };
}

// Menghapus produk dari database
export async function deleteProductAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// Menyimpan (Insert / Update) produk ke database
export async function saveProductAction(payload: any, id?: string) {
  const supabase = await createClient();
  if (id) {
    const { error, data } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return { success: true, data };
  } else {
    const { error, data } = await supabase
      .from("products")
      .insert([payload])
      .select();
    if (error) throw new Error(error.message);
    return { success: true, data };
  }
}

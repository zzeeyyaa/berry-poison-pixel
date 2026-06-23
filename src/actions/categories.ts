"use server";

import { createClient } from "@/src/utils/supabase/server";
import { DBCategory } from "@/src/app/management/types";

// Mengambil daftar kategori berhalaman (paginated)
export async function fetchCategoriesAction(page: number, limit: number) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { categories: (data || []) as DBCategory[], total: count || 0 };
}

// Mengambil seluruh kategori (tanpa halaman) untuk dropdown pilihan
export async function fetchAllCategoriesAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data as DBCategory[];
}

// Menghapus kategori berdasarkan ID
export async function deleteCategoryAction(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// Menyimpan (Insert / Update) kategori ke database
export async function saveCategoryAction(payload: any, id?: number) {
  const supabase = await createClient();
  if (id) {
    const { error, data } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return { success: true, data };
  } else {
    const { error, data } = await supabase
      .from("categories")
      .insert([payload])
      .select();
    if (error) throw new Error(error.message);
    return { success: true, data };
  }
}

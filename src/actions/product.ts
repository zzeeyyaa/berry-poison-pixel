import { supabase } from "../lib/supabase";

export async function getAllProducts() {
    return await supabase.from("products").select("*");
}

export async function getProductsByCategory(category_id: number) {
    return await supabase.from("products").select("*").eq("category_id", category_id);
}

export async function createProduct(formData: FormData) {
    const product = {
        name: formData.get("name") as string,
        price: formData.get("price") as string,
        product_link: formData.get("product_link") as string,
        review: formData.get("review") as string,
        featured: formData.get("featured") === "true",
        video_link: formData.get("video_link") as string | null,
        category_id: Number(formData.get("category_id")),
    };
    const result = await supabase.from("products").insert(product);

    if (!result.error) {
        return { success: true, data: result.data };
    } else {
        return { success: false, error: result.error };
    }
}

export async function deleteProduct(id: string) {
    const result = await supabase.from("products").delete().eq("id", id);
    if (!result.error) {
        return { success: true, data: result.data };
    } else {
        return { success: false, error: result.error };
    }
}

export async function getProductById(id: string) {
    return await supabase.from("products").select("*").eq("id", id);
}

export async function updateProduct(id: string, formData: FormData) {
    const product = {
        name: formData.get("name") as string,
        price: formData.get("price") as string,
        product_link: formData.get("product_link") as string,
        review: formData.get("review") as string,
        featured: formData.get("featured") === "true",
        video_link: formData.get("video_link") as string | null,
        category_id: Number(formData.get("category_id")),
    };
    return await supabase.from("products").update(product).eq("id", id);
}

export async function createCategory(formData: FormData) {
    const category = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        icon: formData.get("icon") as string,
    };
    const result = await supabase.from("categories").insert(category);

    if (!result.error) {
        return { success: true, data: result.data };
    } else {
        return { success: false, error: result.error };
    }
}

export async function updateCategory(id: number, formData: FormData) {
    const category = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        icon: formData.get("icon") as string,
    };
    return await supabase.from("categories").update(category).eq("id", id);
}

export async function deleteCategory(id: number) {
    return await supabase.from("categories").delete().eq("id", id);
}
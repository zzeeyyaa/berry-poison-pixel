import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { productsData } from "@/data/productsData";

export async function GET() {
  try {
    // 1. Extract unique categories from productsData
    const uniqueCategories = Array.from(new Set(productsData.map(p => p.category)));
    
    // Insert categories
    const categoryMap: Record<string, number> = {};
    
    for (const catName of uniqueCategories) {
      // Create slug and guess icon
      const slug = catName.toLowerCase().replace(/\s+/g, "-");
      const icon = productsData.find(p => p.category === catName)?.iconType || "keyboard";
      
      const { data: existing, error: fetchErr } = await supabase
        .from("categories")
        .select("id")
        .eq("name", catName)
        .single();
        
      if (existing) {
        categoryMap[catName] = existing.id;
      } else {
        const { data: newCat, error: insertErr } = await supabase
          .from("categories")
          .insert({ name: catName, slug, icon })
          .select("id")
          .single();
          
        if (insertErr && insertErr.code !== '23505') { // Ignore unique violation if it happens
          throw insertErr;
        } else if (!newCat) {
            // Refetch in case it was inserted concurrently
            const { data: refetched } = await supabase.from("categories").select("id").eq("name", catName).single();
            if (refetched) categoryMap[catName] = refetched.id;
        } else {
            categoryMap[catName] = newCat.id;
        }
      }
    }
    
    // 2. Insert products
    let insertedCount = 0;
    for (const prod of productsData) {
      const category_id = categoryMap[prod.category];
      
      const payload = {
        name: prod.name,
        price: String(prod.price),
        product_link: prod.shopeeLink,
        review: prod.dialogText,
        featured: prod.statBoost.includes("Featured"),
        video_link: null,
        category_id: category_id
      };
      
      const { data: existingProd } = await supabase
        .from("products")
        .select("id")
        .eq("name", prod.name)
        .single();
        
      if (!existingProd) {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        insertedCount++;
      }
    }
    
    return NextResponse.json({ success: true, message: `Seeded ${insertedCount} new products successfully!` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

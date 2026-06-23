import { createClient } from "@supabase/supabase-js";
import { Database } from "@/src/lib/database.types";
import { NextResponse } from "next/server";

// Fungsi helper untuk membuat Supabase client dengan Service Role Key
// Agar bypass Row Level Security (RLS) karena webhook dipanggil dari luar (Telegram)
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Missing Supabase environment variables for Admin Client");
    }

    return createClient<Database>(supabaseUrl, serviceRoleKey);
}

// Fungsi helper untuk mengirim pesan balasan ke Telegram
export async function sendTelegramMessage(chatId: number | string, text: string, replyMarkup?: any) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        console.error("TELEGRAM_BOT_TOKEN is missing in env");
        return;
    }

    try {
        const payload: any = {
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown"
        };
        if (replyMarkup) {
            payload.reply_markup = replyMarkup;
        }

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    } catch (err) {
        console.error("Failed to send Telegram message:", err);
    }
}

// Handler untuk memproses Command Bot (dimulai dengan '/')
export async function handleBotCommand(messageText: string, chatId: number) {
    const command = messageText.split(" ")[0].toLowerCase();

    if (command === "/start") {
        await sendTelegramMessage(chatId, "Halo! Saya adalah bot pengelola produk Berry Poison Pixel 🍓.\n\nKetik /help untuk melihat panduan lengkap cara menambahkan produk.");
        return NextResponse.json({ message: "start command processed" });
    }

    if (command === "/help") {
        await sendTelegramMessage(chatId,
            "📝 *Panduan Menambahkan Produk:*\n\n" +
            "Kirim pesan dengan format berikut:\n" +
            "```\n" +
            "Temukan [Nama Produk] seharga Rp[Harga]\n" +
            "[Link Shopee/Web]\n" +
            "kategori: [Nama Kategori]\n" +
            "review: [Ulasan/Review produk]\n" +
            "video: [Link Video Youtube, opsional]\n" +
            "statboost: [Vibes/Boost, opsional]\n" +
            "level: [Angka, opsional]\n" +
            "```\n\n" +
            "💡 *Contoh:*\n" +
            "```\n" +
            "Temukan Keyboard Retro seharga Rp150.000 https://shopee.co.id/example\n" +
            "kategori: Desk Setup\n" +
            "review: Desain retro cakep banget, tactile switch-nya mantap!\n" +
            "```\n\n" +
            "🛠️ *Command Lain:*\n" +
            "• /clear - Membersihkan antrean pesan error jika bot macet.\n" +
            "• /kategori [Nama] [Ikon] - Menambah kategori baru."
        );
        return NextResponse.json({ message: "help command processed" });
    }

    if (command === "/clear") {
        await sendTelegramMessage(chatId, "🧹 Memulai pembersihan antrean pesan...");

        const token = process.env.TELEGRAM_BOT_TOKEN;
        // Dapatkan info webhook aktif
        const infoRes = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        const infoData = await infoRes.json();
        const activeUrl = infoData.result?.url;

        if (activeUrl) {
            // Hapus antrean (drop pending updates)
            await fetch(`https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=true`);
            // Set kembali ke URL semula
            await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${activeUrl}`);

            await sendTelegramMessage(chatId, "✅ Antrean berhasil dibersihkan! Bot kini berjalan secara fresh.");
        } else {
            await sendTelegramMessage(chatId, "❌ Gagal mendeteksi URL Webhook aktif.");
        }
        return NextResponse.json({ message: "clear command processed" });
    }

    if (command === "/kategori") {
        const argsText = messageText.substring(9).trim(); // Menghapus '/kategori'
        const validIcons = ["keyboard", "hoodie", "console", "deskmat", "glasses", "keychain", "mug", "clock", "bottle", "capsule", "softgel", "jar", "makeup", "lipcare", "buku", "skincare", "bodycare"];

        if (!argsText) {
            await sendTelegramMessage(
                chatId,
                `⚠️ *Format Salah!*\n` +
                `Gunakan: \`/kategori [Nama Kategori] [Ikon]\`\n\n` +
                `🎨 *Pilihan ikon:* \n` +
                `\`${validIcons.join(", ")}\``
            );
            return NextResponse.json({ message: "kategori command failed - empty args" });
        }

        const words = argsText.split(" ");
        let icon = "keyboard"; // Default ikon
        let name = argsText;

        if (words.length > 1) {
            const lastWord = words[words.length - 1].toLowerCase();
            if (validIcons.includes(lastWord)) {
                icon = lastWord;
                name = words.slice(0, words.length - 1).join(" ");
            }
        }

        const slug = name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        const supabase = createAdminClient();

        // Cek dulu apakah slug kategori sudah ada
        const { data: existingCat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

        if (existingCat) {
            await sendTelegramMessage(chatId, `⚠️ Kategori *'${name}'* (slug: \`${slug}\`) sudah ada di database.`);
            return NextResponse.json({ message: "category already exists" });
        }

        const { error, data } = await supabase.from("categories").insert({
            name: name,
            slug: slug,
            icon: icon
        }).select();

        if (error) {
            console.error("Failed to insert category:", error);
            await sendTelegramMessage(chatId, `❌ Gagal menambahkan kategori ke database: ${error.message}`);
            return NextResponse.json({ message: "failed to insert category", error: error.message }, { status: 500 });
        }

        await sendTelegramMessage(
            chatId,
            `✅ *Kategori baru berhasil ditambahkan!*\n\n` +
            `🏷️ *Nama:* ${name}\n` +
            `🔗 *Slug:* \`${slug}\`\n` +
            `🎨 *Ikon:* \`${icon}\``
        );
        return NextResponse.json({ message: "category added successfully", data });
    }

    if (command === "/kategorilist") {
        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from("categories")
            .select("name, slug, icon")
            .order("name", { ascending: true });

        if (error) {
            console.error("Failed to fetch categories:", error);
            await sendTelegramMessage(chatId, `❌ Gagal mengambil daftar kategori: ${error.message}`);
            return NextResponse.json({ message: "failed to list categories" });
        }

        if (!data || data.length === 0) {
            await sendTelegramMessage(chatId, "🗂️ Belum ada kategori di database.");
            return NextResponse.json({ message: "categories empty" });
        }

        const iconEmojis: Record<string, string> = {
            keyboard: "⌨️", hoodie: "🧥", console: "🎮", deskmat: "🖱️", glasses: "👓",
            keychain: "🔑", mug: "☕", clock: "⏰", bottle: "🍼", capsule: "💊",
            softgel: "💊", jar: "🏺", makeup: "💄", lipcare: "💋", buku: "📚",
            skincare: "🧴", bodycare: "🧼"
        };

        const listText = data.map((cat, i) => {
            const emoji = iconEmojis[cat.icon] || "🏷️";
            return `${i + 1}. ${emoji} *${cat.name}* (slug: \`${cat.slug}\`)`;
        }).join("\n");

        await sendTelegramMessage(chatId, `🗂️ *Daftar Kategori di Database:*\n\n${listText}`);
        return NextResponse.json({ message: "kategorilist processed" });
    }

    if (command === "/hapuskategori") {
        const slug = messageText.substring(15).trim().toLowerCase(); // Menghapus '/hapuskategori'
        if (!slug) {
            await sendTelegramMessage(chatId, "⚠️ Format salah. Gunakan:\n`/hapuskategori [slug]`");
            return NextResponse.json({ message: "hapuskategori command failed - empty slug" });
        }

        const supabase = createAdminClient();

        // Cek dulu apakah kategori ada
        const { data: catData, error: catError } = await supabase
            .from("categories")
            .select("name, id")
            .eq("slug", slug)
            .maybeSingle();

        if (catError || !catData) {
            await sendTelegramMessage(chatId, `❌ Gagal: Kategori dengan slug \`${slug}\` tidak ditemukan.`);
            return NextResponse.json({ message: "category not found" });
        }

        // Hapus kategori (CASCADE akan menghapus semua produk di dalamnya secara otomatis)
        const { error: deleteError } = await supabase
            .from("categories")
            .delete()
            .eq("id", catData.id);

        if (deleteError) {
            console.error("Failed to delete category:", deleteError);
            await sendTelegramMessage(chatId, `❌ Gagal menghapus kategori: ${deleteError.message}`);
            return NextResponse.json({ message: "failed to delete category", error: deleteError.message }, { status: 500 });
        }

        await sendTelegramMessage(
            chatId,
            `✅ *Kategori berhasil dihapus!*\n\n` +
            `🏷️ *Nama Kategori:* ${catData.name}\n` +
            `🔗 *Slug:* \`${slug}\`\n\n` +
            `⚠️ *Info:* Semua produk di dalam kategori ini telah dihapus otomatis.`
        );
        return NextResponse.json({ message: "category deleted successfully" });
    }

    if (command === "/cari") {
        const query = messageText.substring(5).trim(); // Menghapus '/cari'
        if (!query) {
            await sendTelegramMessage(chatId, "⚠️ Format salah. Gunakan:\n`/cari [kata kunci]`");
            return NextResponse.json({ message: "cari command failed - empty query" });
        }

        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from("products")
            .select("id, name, price, product_link")
            .ilike("name", `%${query}%`)
            .limit(5);

        if (error) {
            console.error("Failed to search products:", error);
            await sendTelegramMessage(chatId, `❌ Gagal melakukan pencarian: ${error.message}`);
            return NextResponse.json({ message: "search failed" });
        }

        if (!data || data.length === 0) {
            await sendTelegramMessage(chatId, `🔍 Tidak menemukan produk dengan kata kunci *'${query}'*.`);
            return NextResponse.json({ message: "search empty" });
        }

        await sendTelegramMessage(chatId, `🔍 *Hasil pencarian untuk '${query}':*`);

        for (const prod of data) {
            const priceVal = Number(prod.price);
            const formattedPrice = !isNaN(priceVal) && priceVal > 0
                ? `Rp ${priceVal.toLocaleString("id-ID")}`
                : "Tidak ditentukan";

            const text = `📦 *${prod.name}*\n💰 *Harga:* ${formattedPrice}\n🔗 [Beli di Shopee](${prod.product_link})`;

            const replyMarkup = {
                inline_keyboard: [
                    [
                        {
                            text: "❌ Hapus Produk",
                            callback_data: `delete_prod:${prod.id}`
                        }
                    ]
                ]
            };

            await sendTelegramMessage(chatId, text, replyMarkup);
        }

        return NextResponse.json({ message: "cari processed" });
    }

    await sendTelegramMessage(chatId, "❓ Command tidak dikenal. Ketik /help untuk bantuan.");
    return NextResponse.json({ message: "unknown command processed" });
}

// Handler untuk memproses input produk dari pesan biasa
export async function handleProductInput(messageText: string, chatId: number) {
    // Cek apakah pesan tampak seperti percobaan input produk (mengandung link, atau kata kunci kategori/review/Temukan)
    const hasLink = /(https?:\/\/[^\s]+)/.test(messageText);
    const hasCategory = /kategori:/i.test(messageText);
    const hasReview = /(?:review|ulasan):/i.test(messageText);
    const hasProductPrefix = /Temukan/i.test(messageText);

    // Jika pesan tidak mengandung hal-hal di atas, anggap sebagai pesan kasual dan abaikan secara silent (diam)
    if (!hasLink && !hasCategory && !hasReview && !hasProductPrefix) {
        return NextResponse.json({ message: "Casual message ignored" });
    }

    // 1. Parsing Link Shopee
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const linkMatch = messageText.match(urlRegex);
    const productLink = linkMatch ? linkMatch[0] : "";

    if (!productLink) {
        await sendTelegramMessage(chatId, "❌ *Gagal:* Pesan input produk wajib berisi link produk yang valid.");
        return NextResponse.json({ message: "Pesan wajib berisi link produk yang valid" }, { status: 400 });
    }

    // 2. Parsing Harga
    const priceRegex = /seharga\s+Rp([\d.,]+)/i;
    const priceMatch = messageText.match(priceRegex);
    let priceStr = "0";
    if (priceMatch) {
        priceStr = priceMatch[1].replace(/\./g, "");
    }

    // 3. Parsing Judul
    const titleRegex = /Temukan\s+(.*?)\s+seharga/i;
    const titleMatch = messageText.match(titleRegex);
    const title = titleMatch ? titleMatch[1].trim() : "Produk Tanpa Nama";

    // 4. Parsing Parameter Opsional (Video Link, Statboost, Statboost Level)
    const videoRegex = /video(?:_link)?:\s*(https?:\/\/[^\s]+)/i;
    const videoMatch = messageText.match(videoRegex);
    const videoLink = videoMatch ? videoMatch[1].trim() : null;

    const statBoostRegex = /statboost:\s*([^\n\r,;.]+)/i;
    const statBoostMatch = messageText.match(statBoostRegex);
    const statboost = statBoostMatch ? statBoostMatch[1].trim() : null;

    const levelRegex = /(?:level|boostlevel):\s*(\d+)/i;
    const levelMatch = messageText.match(levelRegex);
    const statboostlevel = levelMatch ? parseInt(levelMatch[1], 10) : null;

    // 5. Parsing Kategori (Wajib)
    const categoryRegex = /kategori:\s*([^\n\r,;.]+)/i;
    const categoryMatch = messageText.match(categoryRegex);
    const categoryName = categoryMatch ? categoryMatch[1].trim() : null;

    if (!categoryName) {
        await sendTelegramMessage(chatId, "❌ Gagal: Kategori wajib diisi dengan format 'kategori: Nama Kategori'.");
        return NextResponse.json({ message: "Kategori wajib diisi dengan format 'kategori: Nama Kategori'" }, { status: 400 });
    }

    // 6. Parsing Review / Ulasan (Wajib)
    const reviewRegex = /(?:review|ulasan):\s*([^\n\r]+)/i;
    const reviewMatch = messageText.match(reviewRegex);
    const reviewText = reviewMatch ? reviewMatch[1].trim() : null;

    if (!reviewText) {
        await sendTelegramMessage(chatId, "❌ Gagal: Review/Ulasan produk wajib diisi dengan format 'review: Teks Ulasan' atau 'ulasan: Teks Ulasan'.");
        return NextResponse.json({ message: "Review wajib diisi dengan format 'review: Teks Ulasan'" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Cari id kategori berdasarkan nama (case-insensitive)
    const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .ilike("name", categoryName)
        .maybeSingle();

    if (categoryError || !categoryData) {
        await sendTelegramMessage(chatId, `❌ Gagal: Kategori '${categoryName}' tidak ditemukan di database.`);
        return NextResponse.json({ message: `Kategori '${categoryName}' tidak ditemukan di database` }, { status: 400 });
    }

    const categoryId = categoryData.id;

    // Simpan ke database Supabase
    const { error, data } = await supabase.from("products").insert({
        name: title,
        price: priceStr,
        product_link: productLink,
        review: reviewText,
        featured: false,
        category_id: categoryId,
        video_link: videoLink,
        statboost: statboost,
        statboostlevel: statboostlevel,
    }).select();

    if (error) {
        console.error("Database insert error:", error);
        await sendTelegramMessage(chatId, `❌ Gagal menyimpan produk ke database: ${error.message}`);
        return NextResponse.json({ message: "Failed to insert product", error: error.message }, { status: 500 });
    }

    // Kirim konfirmasi sukses ke Telegram
    const formattedPrice = priceStr !== "0"
        ? `Rp ${Number(priceStr).toLocaleString("id-ID")}`
        : "Tidak ditentukan";

    await sendTelegramMessage(
        chatId,
        `✅ *Berhasil menambahkan produk!*\n\n` +
        `📦 *Nama:* ${title}\n` +
        `💰 *Harga:* ${formattedPrice}\n` +
        `🏷️ *Kategori:* ${categoryName}`
    );

    return NextResponse.json({ message: "success", data });
}

// Handler untuk memproses interaksi klik tombol (callback_query)
export async function handleCallbackQuery(callbackQuery: any) {
    const data = callbackQuery.data;
    const chatId = callbackQuery.message?.chat?.id;
    const messageId = callbackQuery.message?.message_id;
    const callbackQueryId = callbackQuery.id;

    const token = process.env.TELEGRAM_BOT_TOKEN;

    // Helper untuk menjawab callback query agar loading spinner di Telegram berhenti
    const answerCallback = async (text: string) => {
        try {
            await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    callback_query_id: callbackQueryId,
                    text: text
                })
            });
        } catch (err) {
            console.error("Failed to answer callback query:", err);
        }
    };

    if (data && data.startsWith("delete_prod:")) {
        const prodId = data.replace("delete_prod:", "");
        const supabase = createAdminClient();

        // Ambil nama produk untuk info
        const { data: prodData } = await supabase
            .from("products")
            .select("name")
            .eq("id", prodId)
            .maybeSingle();

        if (!prodData) {
            await answerCallback("Produk sudah tidak ada.");
            if (chatId) {
                await sendTelegramMessage(chatId, "⚠️ Produk ini tidak ditemukan atau sudah dihapus sebelumnya.");
            }
            return NextResponse.json({ message: "product not found for deletion" });
        }

        // Hapus produk
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", prodId);

        if (error) {
            console.error("Delete product error:", error);
            await answerCallback("Gagal menghapus produk.");
            if (chatId) {
                await sendTelegramMessage(chatId, `❌ Gagal menghapus produk: ${error.message}`);
            }
            return NextResponse.json({ message: "failed to delete product", error: error.message }, { status: 500 });
        }

        // Sukses hapus
        await answerCallback("Produk berhasil dihapus!");

        // Ubah tampilan pesan agar tombol Hapus hilang & teks berubah menjadi infobox terhapus
        if (chatId && messageId) {
            try {
                await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: `🗑️ *[PRODUK TELAH DIHAPUS]*\n\n📦 *Nama:* ${prodData.name}`,
                        parse_mode: "Markdown"
                    })
                });
            } catch (editErr) {
                console.error("Failed to edit message after deletion:", editErr);
                // Fallback kirim pesan baru jika edit gagal
                await sendTelegramMessage(chatId, `🗑️ *Produk berhasil dihapus:* ${prodData.name}`);
            }
        }
        return NextResponse.json({ message: "product deleted" });
    }

    await answerCallback("Aksi tidak dikenal.");
    return NextResponse.json({ message: "unknown callback data" });
}

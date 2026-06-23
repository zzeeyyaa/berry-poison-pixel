import { NextResponse } from "next/server";
import {
    sendTelegramMessage,
    handleBotCommand,
    handleProductInput,
    handleCallbackQuery
} from "@/src/utils/telegram";

export async function POST(request: Request) {
    let chatId: number | undefined = undefined;
    try {
        const body = await request.json();
        console.log("Telegram webhook payload:", JSON.stringify(body, null, 2));

        // Jika ini adalah event klik tombol (callback_query)
        const callbackQuery = body.callback_query;
        if (callbackQuery) {
            const fromId = callbackQuery.from?.id;
            chatId = callbackQuery.message?.chat?.id || fromId;

            // Validasi pengirim
            const allowedIdsEnv = process.env.TELEGRAM_ALLOWED_USER_IDS;
            if (allowedIdsEnv && allowedIdsEnv.trim() !== "") {
                const allowedIds = allowedIdsEnv.split(",").map(id => id.trim());
                if (!fromId || !allowedIds.includes(String(fromId))) {
                    if (chatId) {
                        await sendTelegramMessage(chatId, "⚠️ Maaf, Anda tidak memiliki akses untuk menggunakan bot ini.");
                    }
                    return NextResponse.json({ message: "Unauthorized user" }, { status: 403 });
                }
            }

            return await handleCallbackQuery(callbackQuery);
        }

        const messageText = body.message?.text || "";
        const fromId = body.message?.from?.id;
        chatId = body.message?.chat?.id || fromId;

        // Validasi pengirim jika ada restriction
        const allowedIdsEnv = process.env.TELEGRAM_ALLOWED_USER_IDS;
        if (allowedIdsEnv && allowedIdsEnv.trim() !== "") {
            const allowedIds = allowedIdsEnv.split(",").map(id => id.trim());
            if (!fromId || !allowedIds.includes(String(fromId))) {
                if (chatId) {
                    await sendTelegramMessage(chatId, "⚠️ Maaf, Anda tidak memiliki akses untuk menggunakan bot ini.");
                }
                return NextResponse.json({ message: "Unauthorized user" }, { status: 403 });
            }
        }

        if (!chatId) {
            return NextResponse.json({ message: "Missing chat ID" }, { status: 400 });
        }

        // Delegasikan penanganan berdasarkan tipe pesan
        if (messageText.startsWith("/")) {
            return await handleBotCommand(messageText, chatId);
        } else {
            return await handleProductInput(messageText, chatId);
        }

    } catch (err: any) {
        console.error("Webhook processing error:", err);
        if (chatId) {
            await sendTelegramMessage(chatId, `❌ Terjadi kesalahan internal server saat memproses data.`);
        }
        return NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 });
    }
}

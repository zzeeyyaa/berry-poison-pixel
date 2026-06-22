"use client";

import { signin } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";

export default function AuthPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signin, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Login Berhasil! Mengalihkan ke sistem management...");
      router.push("/management");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-[#F5EBE6] flex items-center justify-center py-12 px-4 font-sans select-none relative overflow-x-hidden">
      {/* Vintage Print Dot Grid Texture Background */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: "radial-gradient(#4E3C44 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-md w-full z-10 flex flex-col gap-6">
        {/* Back Link */}
        <div className="text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4E3C44]/75 hover:text-[#D9455B] transition-colors"
          >
            ← Kembali ke Toko
          </Link>
        </div>

        {/* Auth Card Container */}
        <div className="bg-[#FCF8F7] border border-[#4E3C44]/15 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 relative border-t-[6px] border-t-[#D9455B]">

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center gap-2">
            {/* Pixel Strawberry Logo */}
            <img src="/strawberry.svg" alt="Strawberry Logo" className="w-12 h-12 flex-shrink-0 drop-shadow-sm" style={{ imageRendering: "pixelated" }} />
            <h1 className="font-sans font-black text-xl text-[#4E3C44] tracking-wide mt-1">
              poison<span className="text-[#D9455B]">.pixel</span>
            </h1>
            <p className="text-[10px] font-black text-[#4E3C44]/60 uppercase tracking-[0.2em] mt-1">
              Admin Access Only
            </p>
          </div>

          {/* Feedback Messages Handled by Toast */}

          {/* Login Form */}
          <form action={formAction} className="flex flex-col gap-4">

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] font-bold text-[#4E3C44]/70 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@example.com"
                required
                autoComplete="email"
                className="w-full bg-[#FFFDFD] border border-[#4E3C44]/15 rounded-xl p-3 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] placeholder-[#4E3C44]/30 transition-all shadow-sm"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-[10px] font-bold text-[#4E3C44]/70 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FFFDFD] border border-[#4E3C44]/15 rounded-xl p-3 pr-12 text-xs font-bold text-[#4E3C44] focus:outline-none focus:border-[#D9455B] focus:ring-2 focus:ring-[#FADCDA] placeholder-[#4E3C44]/30 transition-all shadow-sm"
                />

                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#4E3C44]/50 hover:text-[#D9455B] transition-colors cursor-pointer select-none"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || state?.success}
              variant="cherry"
              className="w-full py-3 mt-2 text-xs uppercase tracking-wider"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}

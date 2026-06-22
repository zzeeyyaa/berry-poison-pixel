import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/Button";
import { ConfirmDialog } from "./ui/ConfirmDialog";
import { toast } from "sonner";

export function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    // Check initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGearClick = () => {
    if (!user) {
      toast.error("Login dulu buat manage!", { duration: 1500 });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);
    } else {
      window.location.href = "/management";
    }
  };

  const handleAuthAction = async () => {
    if (user) {
      setShowLogoutConfirm(true);
    } else {
      window.location.href = "/auth";
    }
  };

  const executeLogout = async () => {
    setShowLogoutConfirm(false);
    await supabase.auth.signOut();
    toast.success("Berhasil Sign Out!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Gear Settings Button */}
      <button
        onClick={handleGearClick}
        className="w-8 h-8 rounded-full bg-[#FCF8F7] hover:bg-[#F3E2DC]/50 border border-[#4E3C44]/10 flex items-center justify-center text-[#4E3C44] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Settings / Management"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {/* Authentication Button */}
      <Button
        onClick={handleAuthAction}
        variant={user ? "espresso" : "cherry"}
        className={user ? "" : "hover:bg-[#4E3C44]!"}
      >
        {user ? "Sign Out" : "Sign In"}
      </Button>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Sign Out"
        description="Apakah Anda yakin ingin keluar dari sesi admin Anda?"
        confirmText="Keluar"
        cancelText="Batal"
        variant="danger"
        onConfirm={executeLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
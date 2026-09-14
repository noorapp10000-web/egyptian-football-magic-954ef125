import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TEAM_CREST } from "@/lib/hub-types";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | Masrawy Fan" },
      {
        name: "description",
        content:
          "سجّل دخولك في تطبيق Masrawy Fan بحساب جوجل أو بالبريد الإلكتروني لحفظ اسمك وتفضيلات الإشعارات على كل أجهزتك.",
      },
      { property: "og:title", content: "تسجيل الدخول | Masrawy Fan" },
      {
        property: "og:description",
        content: "ادخل بحساب جوجل أو بالبريد لتتابع إشعارات المصري البورسعيدي.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) navigate({ to: "/settings", replace: true });
  }, [loading, isAuthenticated, navigate]);

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("تعذر الدخول بحساب جوجل، حاول مرة أخرى");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/settings", replace: true });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("تم إنشاء الحساب — افتح بريدك وأكّد التسجيل");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/settings", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذر إتمام العملية");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-5 py-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={TEAM_CREST} alt="شعار النادي المصري" className="size-16 object-contain" />
        <h1 className="text-lg font-black">مرحبًا بك في Masrawy Fan</h1>
        <p className="text-[11px] text-muted-foreground">
          سجّل دخولك لحفظ اسمك وتفضيلات الإشعارات على كل أجهزتك.
        </p>
      </div>

      <Button onClick={google} disabled={busy} className="w-full rounded-xl font-bold">
        <LogIn className="size-4" /> المتابعة بحساب جوجل
      </Button>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> أو بالبريد الإلكتروني
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold">
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-bold">
            كلمة المرور
          </Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl"
          />
        </div>
        <Button type="submit" disabled={busy} variant="secondary" className="w-full rounded-xl font-bold">
          {mode === "signin" ? "دخول" : "إنشاء حساب"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-[11px] font-bold text-primary"
        >
          {mode === "signin" ? "ليس لديك حساب؟ أنشئ حسابًا" : "لديك حساب بالفعل؟ سجّل الدخول"}
        </button>
      </form>
    </div>
  );
}

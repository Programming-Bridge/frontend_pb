"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/logo.png";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setCredentials,
  setAuthLoading,
  setAuthError,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/lib/store/features/auth/authSlice";
import { login, getToken } from "@/app/services/authService";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Home,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const authError = useAppSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated || getToken()) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    dispatch(setAuthLoading(true));
    try {
      const response = await login({ email: email.trim(), password });
      if (response.token && response.user) {
        dispatch(setCredentials({ token: response.token, user: response.user }));
        setSuccessMessage("Authentication successful! Redirecting to Dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
      } else {
        throw new Error(response.message || "Invalid authentication response.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.";
      setErrorMessage(msg);
      dispatch(setAuthError(msg));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  // Quick autofill helper for default credentials
  const fillDefaultAdmin = () => {
    setEmail("admin@programmingbridge.org");
    setPassword("admin123456");
    setErrorMessage(null);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px] dark:bg-brand/20" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 -z-10 h-[450px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px] dark:bg-cyan-500/15" />

      {/* Top Header Bar */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-foreground-muted hover:text-brand transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border/80 bg-card/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-brand/30 bg-surface shadow-lg shadow-brand/15 ring-2 ring-brand/20">
              <Image
                src={logoImg}
                alt="Programming Bridge"
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11px] font-bold tracking-wide text-brand uppercase mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Access Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Sign In to <span className="text-brand">PB Console</span>
            </h1>
            <p className="mt-1.5 text-xs text-foreground-muted">
              Enter your credentials to manage banners, projects, tech stack, and inquiries.
            </p>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-foreground-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@programmingbridge.org"
                  className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-foreground-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-border bg-surface pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer"
                />
                <span className="text-xs text-foreground-muted">Remember this session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover active:scale-[0.98] disabled:opacity-60 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Default Credentials Autofill */}
          <div className="mt-6 pt-5 border-t border-border/70 text-center">
            <button
              type="button"
              onClick={fillDefaultAdmin}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:bg-surface-hover hover:text-brand transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Autofill Default Admin Details</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

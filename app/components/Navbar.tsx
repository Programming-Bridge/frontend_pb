"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImg from "@/public/logo.png";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setNavItems,
  setNavbarLoading,
  setNavbarError,
  selectNavItems,
  selectNavbarLoading,
} from "@/lib/store/features/navbar/navbarSlice";
import {
  selectIsAuthenticated,
  selectAuthUser,
  setCredentials,
  logoutUser,
} from "@/lib/store/features/auth/authSlice";
import { getNavbar, type NavItem } from "@/app/services/navbarService";
import { getToken, getUser, logout as authLogout } from "@/app/services/authService";
import { ThemeToggle } from "./ThemeToggle";
import { NavbarSkeleton } from "./skeletons/NavbarSkeleton";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Layers,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const navItems = useAppSelector(selectNavItems);
  const isLoading = useAppSelector(selectNavbarLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectAuthUser);

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Sync auth state on mount
  useEffect(() => {
    setMounted(true);
    const token = getToken();
    const user = getUser();
    if (token && user) {
      dispatch(setCredentials({ token, user }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    authLogout();
    dispatch(logoutUser());
    setMobileMenuOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchNavbar = async () => {
      dispatch(setNavbarLoading(true));
      try {
        const items = await getNavbar();
        if (isMounted && items && items.length > 0) {
          dispatch(setNavItems(items));
          dispatch(setNavbarError(null));
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to load navbar";
          dispatch(setNavbarError(message));
        }
      } finally {
        if (isMounted) {
          dispatch(setNavbarLoading(false));
        }
      }
    };

    fetchNavbar();

    return () => {
      isMounted = false;
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [dispatch]);

  // Lock body scroll when mobile sidebar is open & close on Escape
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const getItemHref = (item: NavItem) => {
    return item.path || item.href || item.url || item.link || "#";
  };

  const getItemLabel = (item: NavItem) => {
    return item.label || item.name || item.title || "Link";
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-brand"
            aria-label="Programming Bridge Home"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-xs ring-1 ring-border/50 transition-all group-hover:shadow-md group-hover:ring-brand/40">
              <Image
                src={logoImg}
                alt="Programming Bridge"
                width={40}
                height={40}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-extrabold leading-none text-foreground transition-colors group-hover:text-brand">
                Programming
              </span>
              <span className="text-xs font-bold leading-none text-brand mt-0.5">
                Bridge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {isLoading || navItems.length === 0 ? (
              <NavbarSkeleton />
            ) : (
              navItems.map((item, idx) => {
                const label = getItemLabel(item);
                const href = getItemHref(item);
                const hasDropdown = item.hasDropDown && item.dropDown && item.dropDown.length > 0;
                const itemId = item._id || item.id || `nav-${idx}`;

                if (hasDropdown) {
                  const isOpen = activeDropdown === String(itemId);
                  return (
                    <div
                      key={itemId}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(String(itemId))}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        onClick={() => setActiveDropdown(isOpen ? null : String(itemId))}
                        className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand" : ""
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu with contiguous hover buffer */}
                      {isOpen && (
                        <div className="absolute left-0 top-full pt-2 w-56 z-50">
                          <div className="rounded-xl border border-border bg-card p-1.5 shadow-xl">
                            {item.dropDown?.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                href={subItem.path || subItem.href || "#"}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-lg px-3 py-2 text-xs font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-brand"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={itemId}
                    href={href}
                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    {label}
                  </Link>
                );
              })
            )}

            {/* If authenticated, show dynamic Dashboard link */}
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-brand/10 border border-brand/20 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand hover:text-white transition-all shadow-xs ml-1"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </Link>
            )}
          </nav>

          {/* Right Side Actions: ThemeToggle + CTA / Admin Status */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            {/* Authenticated Admin Controls vs Guest CTA */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                  <span className="max-w-[100px] truncate">{currentUser?.name || "Admin"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 sm:inline-flex"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:border-brand/40 hover:bg-surface-hover md:hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Portal-Mounted Mobile Off-Canvas Sidebar Drawer */}
        {mounted && mobileMenuOpen && createPortal(
          <div className="fixed inset-0 z-[9999] md:hidden">
            {/* Fullscreen Dimming Overlay */}
            <div
              className="drawer-overlay fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Solid Opaque Slide-In Sidebar Panel */}
            <div
              className="drawer-panel fixed inset-y-0 right-0 z-[10000] flex h-[100dvh] w-[86vw] max-w-[340px] flex-col border-l border-border shadow-2xl overflow-hidden bg-white dark:bg-[#0B0F12] text-foreground"
              style={{ backgroundColor: "var(--background)" }}
            >
              {/* Sidebar Top Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4.5 bg-white dark:bg-[#0B0F12]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-2.5 font-bold tracking-tight text-foreground"
                  aria-label="Programming Bridge Home"
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-xs ring-1 ring-border/50">
                    <Image
                      src={logoImg}
                      alt="Programming Bridge"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-extrabold leading-none text-foreground">
                      Programming
                    </span>
                    <span className="text-[10px] font-bold leading-none text-brand mt-0.5">
                      Bridge
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-surface-hover hover:border-brand/40 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Nav List Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-2 bg-white dark:bg-[#0B0F12]">
                {/* If Authenticated: Display Admin Dashboard Button at Top of Mobile Menu */}
                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-bold text-brand shadow-sm hover:bg-brand hover:text-white transition-all mb-3"
                  >
                    <span className="flex items-center gap-2.5">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </Link>
                )}

                <nav className="flex flex-col gap-2">
                  {navItems.map((item, idx) => {
                    const label = getItemLabel(item);
                    const href = getItemHref(item);
                    const hasDropdown = item.hasDropDown && item.dropDown && item.dropDown.length > 0;
                    const itemId = item._id || item.id || `mobile-nav-${idx}`;
                    const isExpanded = mobileExpanded === String(itemId);

                    return (
                      <div key={itemId} className="flex flex-col">
                        {hasDropdown ? (
                          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                            <button
                              onClick={() => setMobileExpanded(isExpanded ? null : String(itemId))}
                              className={`flex w-full items-center justify-between px-4 py-3.5 text-sm font-bold transition-colors cursor-pointer ${isExpanded
                                  ? "bg-brand/10 text-brand"
                                  : "text-foreground hover:bg-surface-hover hover:text-brand"
                                }`}
                              aria-expanded={isExpanded}
                            >
                              <span className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-brand" />
                                <span>{label}</span>
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand" : "text-foreground-muted"
                                  }`}
                              />
                            </button>

                            {/* Subnavbar Accordion Inside Sidebar */}
                            {isExpanded && (
                              <div className="drawer-accordion border-t border-border bg-card px-2.5 py-2.5 flex flex-col gap-1">
                                {/* Main Category Link */}
                                <Link
                                  href={href}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-brand bg-brand/10 hover:bg-brand/15 transition-colors"
                                >
                                  <span>Overview ({label})</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>

                                {item.dropDown?.map((subItem, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={subItem.path || subItem.href || "#"}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileExpanded(null);
                                    }}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground-muted hover:text-brand hover:bg-surface transition-colors"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand/40" />
                                    <span>{subItem.label}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5 text-sm font-bold text-foreground hover:bg-surface-hover hover:text-brand hover:border-brand/40 transition-colors"
                          >
                            <span>{label}</span>
                            <ArrowRight className="h-4 w-4 text-foreground-muted" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Bottom Sticky Footer */}
              <div className="border-t border-border p-4 space-y-3 bg-surface shrink-0">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-foreground-muted">Appearance Mode</span>
                  <ThemeToggle />
                </div>

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Log Out ({currentUser?.name || "Admin"})</span>
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover active:scale-95 transition-all text-center cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      </header>
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

export default Navbar;

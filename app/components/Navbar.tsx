"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setNavItems,
  setNavbarLoading,
  setNavbarError,
  selectNavItems,
  selectNavbarLoading,
} from "@/lib/store/features/navbar/navbarSlice";
import { getNavbar, type NavItem } from "@/app/services/navbarService";
import { ThemeToggle } from "./ThemeToggle";
import { Code2, ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const dispatch = useAppDispatch();
  const navItems = useAppSelector(selectNavItems);
  const isLoading = useAppSelector(selectNavbarLoading);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const getItemHref = (item: NavItem) => {
    return item.path || item.href || item.url || item.link || "#";
  };

  const getItemLabel = (item: NavItem) => {
    return item.label || item.name || item.title || "Link";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-brand"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20 transition-all group-hover:bg-brand group-hover:text-white group-hover:shadow-md group-hover:shadow-brand/30">
            <Code2 className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-extrabold leading-none text-foreground transition-colors group-hover:text-brand">
              Programming
            </span>
            <span className="text-xs font-bold leading-none text-brand">
              Bridge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item, idx) => {
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
                    <div className="absolute left-0 top-full pt-2 w-52 z-50">
                      <div className="rounded-xl border border-border bg-card p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95">
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
          })}
        </nav>

        {/* Right Side Actions: ThemeToggle + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <Link
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 sm:inline-flex"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:border-brand/40 hover:bg-surface-hover md:hidden cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-2 pb-6 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, idx) => {
              const label = getItemLabel(item);
              const href = getItemHref(item);
              const hasDropdown = item.hasDropDown && item.dropDown && item.dropDown.length > 0;
              const itemId = item._id || item.id || `mobile-nav-${idx}`;

              return (
                <div key={itemId} className="flex flex-col">
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-hover hover:text-brand"
                  >
                    <span>{label}</span>
                  </Link>

                  {hasDropdown && (
                    <div className="ml-4 flex flex-col border-l border-border pl-2 my-1 gap-1">
                      {item.dropDown?.map((subItem, sIdx) => (
                        <Link
                          key={sIdx}
                          href={subItem.path || subItem.href || "#"}
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-md px-3 py-1.5 text-xs text-foreground-muted hover:text-brand hover:bg-surface-hover"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// Default export for compatibility with both default and named imports
export default Navbar;

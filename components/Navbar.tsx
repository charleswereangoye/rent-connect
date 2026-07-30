"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto transition-all duration-300 ${
        isScrolled
          ? "shadow-md bg-white/95 backdrop-blur-md dark:bg-on-surface/95"
          : "bg-surface-container-lowest dark:bg-on-surface"
      }`}
    >
      <div className="flex items-center justify-center md:justify-start gap-sm">
        <span
          className="material-symbols-outlined text-primary text-[32px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          domain
        </span>
        <div className="text-h3 font-h3 text-primary tracking-tight">
          Rent Connect
        </div>
      </div>
      <div className="hidden md:flex gap-xl items-center">
        <Link
          className="text-primary font-bold border-b-2 border-transparent font-label-md text-label-md transition-colors duration-150"
          href="/"
        >
          Home
        </Link>

        <Link
          href="/login"
          className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-150"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
        >
          Sign Up
        </Link>
      </div>
      <button
        className="md:hidden flex items-center justify-center bg-transparent border-none p-1"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="material-symbols-outlined text-primary text-[32px]">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </button>
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface-container-lowest dark:bg-on-surface border-t border-outline-variant/30 shadow-lg z-40 md:hidden flex flex-col p-md">
          <Link
            className="font-label-md text-label-md text-primary font-bold py-md px-sm"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant py-md px-sm"
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant py-md px-sm"
            href="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

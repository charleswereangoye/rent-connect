"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_PROPERTIES } from "@/lib/data";

export default function SearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to format price like 1200000 -> 1.2M, 850000 -> 850K
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `RWF ${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `RWF ${(price / 1000).toFixed(0)}K`;
    }
    return `RWF ${price}`;
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-on-surface/95"
            : "bg-surface-container-lowest dark:bg-on-surface shadow-sm"
        }`}
      >
        <nav className="flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto">
          <div className="flex items-center gap-sm">
            <Link href="/" className="text-h3 font-h3 text-primary">
              Rent Connect
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-xl">
            <Link
              className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-xs"
              href="/search"
            >
              Search
            </Link>
            <Link
              className="font-label-md text-label-md text-on-secondary-container hover:text-primary transition-colors py-xs"
              href="#"
            >
              Messages
            </Link>
            <Link
              className="font-label-md text-label-md text-on-secondary-container hover:text-primary transition-colors py-xs"
              href="#"
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center gap-md">
            <button className="hidden md:block bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md hover:bg-primary-container transition-all active:opacity-80">
              Post a Listing
            </button>
            <button className="md:hidden text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-[64px]">
        {/* Hero Section */}
        <section className="relative pt-2xl pb-3xl px-lg md:px-2xl overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfOJ0ixrLjnp0PM4k1GaVIbC5c9IzItZL3BFxLHbAeJcMj1-TaFGe9Ka7w-iDSERNziNt-iypI1Om2e4PcNvngmuwQAOpS9MCULMiMmxamjn5n__u0fRJidhv15F8pSsyDPVjTqjqpSd72sx7TT05rYsnL0Rw8ON8AwH7MV4hvZO7dSdm9xojadyX3t5qXQtLpcctZb2ine8Rk2_UbrzW_7-bkznUmvg0LL_RTwo_PC7aQALAs0Wl4YQ9hw4VH1f6jVLXu7u0')",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(248, 249, 255, 0) 0%, rgba(248, 249, 255, 1) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-max-width mx-auto text-center space-y-xl">
            <h1 className="font-h1 text-h1-mobile md:text-h1 text-on-surface">
              Find your next home in Kigali
            </h1>

            {/* Floating Pill Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-surface-container-lowest shadow-lg rounded-full p-xs md:p-sm flex flex-col md:flex-row items-center gap-xs border border-outline-variant">
                {/* Neighborhood Filter */}
                <div className="flex-1 w-full flex items-center px-lg py-xs md:py-0 border-b md:border-b-0 md:border-r border-outline-variant group cursor-pointer hover:bg-surface-container-low rounded-l-full transition-colors">
                  <span className="material-symbols-outlined text-primary mr-sm">
                    location_on
                  </span>
                  <div className="text-left overflow-hidden flex-1">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Neighborhood
                    </p>
                    <select className="bg-transparent border-none p-0 focus:ring-0 font-label-md text-on-surface w-full appearance-none outline-none cursor-pointer">
                      <option>Select location</option>
                      <option>Kimironko</option>
                      <option>Kiyovu</option>
                      <option>Kacyiru</option>
                      <option>Nyarutarama</option>
                      <option>Rebero</option>
                    </select>
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="flex-1 w-full px-lg py-xs md:py-0 border-b md:border-b-0 md:border-r border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
                  <div className="text-left">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Price Range (RWF)
                    </p>
                    <div className="flex items-center gap-sm mt-xs">
                      <input
                        className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer"
                        max="3000000"
                        min="200000"
                        step="50000"
                        type="range"
                        defaultValue="1500000"
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms Count */}
                <div className="flex-1 w-full px-lg py-xs md:py-0 cursor-pointer hover:bg-surface-container-low transition-colors rounded-r-none md:rounded-r-none">
                  <div className="text-left">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Bedrooms
                    </p>
                    <div className="flex items-center gap-md">
                      <span className="font-label-md text-on-surface">Any</span>
                      <div className="flex gap-xs">
                        <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-label-sm hover:border-primary hover:text-primary transition-all">
                          1+
                        </button>
                        <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-label-sm hover:border-primary hover:text-primary transition-all">
                          2+
                        </button>
                        <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-label-sm hover:border-primary hover:text-primary transition-all">
                          3+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Action */}
                <button className="w-full md:w-auto bg-primary text-on-primary p-md rounded-full flex items-center justify-center gap-sm hover:bg-primary-container transition-all">
                  <span className="material-symbols-outlined">search</span>
                  <span className="md:hidden font-label-md">Search Homes</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Property Grid */}
        <section className="max-w-max-width mx-auto px-lg md:px-2xl py-xl">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface">
                Featured Listings
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Handpicked verified properties in prime neighborhoods.
              </p>
            </div>
            <div className="flex gap-sm">
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>

          {/* Bento-like Grid System from AI Studio Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {INITIAL_PROPERTIES.map((property) => (
              <div
                key={property.id}
                className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${property.imageUrl}')` }}
                  />

                  {/* Badge Overlay */}
                  {property.verified && (
                    <div className="absolute top-sm right-sm bg-white/90 backdrop-blur-md px-sm py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                      <span
                        className="material-symbols-outlined text-[16px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase">
                        LANDLORD VERIFIED
                      </span>
                    </div>
                  )}

                  {/* Video Tour Overlay (Mock) */}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="material-symbols-outlined text-white text-3xl">
                      play_circle
                    </span>
                  </div>
                </div>

                <div className="p-md space-y-sm flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-h3 text-body-lg font-bold text-on-surface truncate">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-on-surface-variant mt-1">
                          <span className="material-symbols-outlined text-sm mr-1">
                            location_on
                          </span>
                          <span className="font-body-sm text-body-sm truncate">
                            {property.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="font-h3 text-body-lg font-bold text-primary">
                          {formatPrice(property.price)}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          / month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-md pt-sm mt-sm border-t border-outline-variant/30 text-on-surface-variant">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-md">
                        bed
                      </span>
                      <span className="font-label-md">
                        {property.beds} {property.beds === "Studio" ? "" : "Beds"}
                      </span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-md">
                        bathtub
                      </span>
                      <span className="font-label-md">{property.baths} Baths</span>
                    </div>
                    {property.size && (
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-md">
                          square_foot
                        </span>
                        <span className="font-label-md">{property.size}m²</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder for scroll indicator */}
            <div className="col-span-full py-xl flex flex-col items-center gap-md">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-label-md text-on-surface-variant animate-pulse">
                Loading more verified homes...
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto">
          <div className="space-y-sm text-center md:text-left">
            <span className="text-label-md font-label-md text-primary">
              Rent Connect
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              © 2026 Rent Connect Kigali. Premier Housing Marketplace.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-lg">
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              About Us
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Help Center
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Contact Support
            </Link>
          </div>
          <div className="flex gap-md">
            <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-md">
                share
              </span>
            </button>
            <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-md">
                language
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

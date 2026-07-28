"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { INITIAL_PROPERTIES } from "@/lib/data";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const property = INITIAL_PROPERTIES.find((p) => p.id === id);
  
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!property) {
    return notFound();
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % property.galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + property.galleryImages.length) % property.galleryImages.length);
  };

  return (
    <div className="bg-[#f8f9ff] text-on-background min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface shadow-sm">
        <Link href="/" className="text-h3 font-h3 text-primary dark:text-primary-fixed">
          Rent Connect
        </Link>
        <nav className="hidden md:flex items-center gap-xl">
          <Link
            className="font-label-md text-label-md text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant transition-colors py-xs px-sm rounded-lg active:opacity-80 duration-150"
            href="/search"
          >
            Search
          </Link>
          <Link
            className="font-label-md text-label-md text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant transition-colors py-xs px-sm rounded-lg active:opacity-80 duration-150"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="font-label-md text-label-md text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant transition-colors py-xs px-sm rounded-lg active:opacity-80 duration-150"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-md">
          <button className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all shadow-md">
            Post a Listing
          </button>
          <button className="md:hidden flex items-center justify-center p-xs">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-lg md:px-2xl py-xl flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-xl">
            {/* Gallery Carousel */}
            <div className="relative group overflow-hidden rounded-xl bg-surface-container shadow-sm aspect-video">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={property.galleryImages[currentImageIdx]}
                alt={property.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-lg pointer-events-none">
                <div className="flex gap-sm">
                  <span className="bg-white/90 backdrop-blur-md text-primary font-label-sm text-label-sm px-md py-xs rounded-full">
                    {currentImageIdx + 1}/{property.galleryImages.length} Photos
                  </span>
                  {property.verified && (
                    <span className="bg-primary text-white font-label-sm text-label-sm px-md py-xs rounded-full flex items-center gap-xs">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      Verified Listing
                    </span>
                  )}
                </div>
              </div>

              {/* Nav buttons */}
              {property.galleryImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-md top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-md top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </>
              )}
            </div>

            {/* Title & Basic Info */}
            <section className="space-y-sm">
              <h1 className="font-h1 text-h1 text-on-surface">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-md text-on-surface-variant font-body-md">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-primary">bed</span>{" "}
                  {property.beds} {property.beds === "Studio" ? "" : "Bedrooms"}
                </span>
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-primary">bathtub</span>{" "}
                  {property.baths} Bathrooms
                </span>
                {property.size && (
                  <span className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary">square_foot</span>{" "}
                    {property.size}m²
                  </span>
                )}
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-primary">location_on</span>{" "}
                  {property.location}
                </span>
              </div>
            </section>

            <hr className="border-outline-variant" />

            {/* Description */}
            <section className="space-y-md">
              <h2 className="font-h3 text-h3 text-on-surface">Description</h2>
              <div className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                {property.description}
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="space-y-md">
              <h2 className="font-h3 text-h3 text-on-surface">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary">
                      {amenity.toLowerCase().includes('wifi') ? 'wifi' 
                      : amenity.toLowerCase().includes('parking') ? 'local_parking' 
                      : amenity.toLowerCase().includes('air') ? 'ac_unit' 
                      : amenity.toLowerCase().includes('gym') ? 'fitness_center' 
                      : amenity.toLowerCase().includes('pool') ? 'pool' 
                      : amenity.toLowerCase().includes('security') ? 'security' 
                      : amenity.toLowerCase().includes('power') ? 'power' 
                      : 'check_circle'}
                    </span>
                    <span className="font-label-md text-label-md">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Tour */}
            <section className="space-y-md">
              <h2 className="font-h3 text-h3 text-on-surface">Landlord Walkthrough Tour</h2>
              <div className="relative rounded-xl shadow-lg bg-black group overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${property.imageUrl}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
                  <span
                    className="material-symbols-outlined text-[64px] text-white/90"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                </div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">info</span>{" "}
                Recorded recently • Verified by Rent Connect
              </p>
            </section>

            {/* Report Section */}
            <section className="pt-xl pb-md">
              <button className="flex items-center gap-xs text-error font-label-md text-label-md hover:underline decoration-error/40 transition-all">
                <span className="material-symbols-outlined text-[18px]">report</span>{" "}
                Report Suspicious Listing
              </button>
            </section>
          </div>

          {/* Right Column: Sticky Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] p-lg bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xl space-y-lg transition-all hover:shadow-2xl">
              <div className="flex justify-between items-baseline">
                <div className="space-y-xs">
                  <span className="text-h3 font-h3 text-primary">RWF {formatPrice(property.price)}</span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">
                    / month
                  </span>
                </div>
                {property.priceUSD && (
                  <div className="flex items-center gap-xs text-tertiary">
                    <span className="font-label-md text-label-md">~ ${formatPrice(property.priceUSD)}</span>
                  </div>
                )}
              </div>

              {/* Date/Time Picker Mockup */}
              <div className="space-y-sm">
                <label className="font-label-md text-label-md text-on-surface block">
                  Schedule a Visit
                </label>
                <div className="grid grid-cols-2 gap-xs">
                  <button className="flex flex-col items-start gap-xs p-md border border-outline-variant rounded-l-xl hover:bg-surface-container-low transition-colors text-left">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                      Date
                    </span>
                    <span className="font-body-sm text-body-sm">Today</span>
                  </button>
                  <button className="flex flex-col items-start gap-xs p-md border border-l-0 border-outline-variant rounded-r-xl hover:bg-surface-container-low transition-colors text-left">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                      Time
                    </span>
                    <span className="font-body-sm text-body-sm">10:00 AM</span>
                  </button>
                </div>
              </div>

              <div className="space-y-md">
                <button className="w-full bg-primary text-on-primary py-lg rounded-xl font-h3 text-h3 hover:bg-primary-container transition-all shadow-md active:scale-[0.98]">
                  Book an In-Person Visit
                </button>
                <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
                  You won't be charged yet
                </p>
              </div>

              <div className="space-y-md border-t border-outline-variant pt-lg">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Service Fee</span>
                  <span>RWF 5,000</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Visit deposit (Ref.)</span>
                  <span>RWF 10,000</span>
                </div>
                <div className="flex justify-between font-label-md text-label-md text-on-surface border-t border-outline-variant pt-md">
                  <span>Total</span>
                  <span>RWF 15,000</span>
                </div>
              </div>

              {/* Host Info Widget */}
              <div className="flex items-center gap-md p-md bg-secondary-container/30 rounded-xl border border-secondary-container">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={property.agent.imageUrl}
                    alt={property.agent.name}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-label-md text-on-surface">
                    Listed by {property.agent.name}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    {property.agent.role} • {property.agent.experience}
                  </p>
                </div>
                <button className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-low dark:bg-on-secondary-fixed border-t border-outline-variant mt-auto">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <div className="text-label-md font-label-md text-primary dark:text-primary-fixed">
            Rent Connect
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">
            © 2026 Rent Connect Kigali. Premier Housing Marketplace.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            href="#"
          >
            About Us
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            href="#"
          >
            Help Center
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            href="#"
          >
            Contact Support
          </Link>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_PROPERTIES } from "@/lib/data";
import { useAuth } from "@/lib/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function SearchPage() {
  const { role } = useAuth();
  const supabase = createClient();
  const [isScrolled, setIsScrolled] = useState(false);
  const [properties, setProperties] = useState<any[]>(INITIAL_PROPERTIES);
  const [filteredProperties, setFilteredProperties] = useState<any[]>(INITIAL_PROPERTIES);
  const [isLoading, setIsLoading] = useState(true);

  // Search States
  const [searchNeighborhood, setSearchNeighborhood] = useState('Select location');
  const [searchPrice, setSearchPrice] = useState(3000000);
  const [searchBeds, setSearchBeds] = useState('Any');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const applyFilters = () => {
    let result = properties;
    if (searchNeighborhood !== 'Select location') {
      result = result.filter((p: any) => p.neighborhood === searchNeighborhood);
    }
    result = result.filter((p: any) => p.price <= searchPrice);
    if (searchBeds !== 'Any') {
      if (searchBeds === '1+') result = result.filter((p: any) => typeof p.beds === 'number' ? p.beds >= 1 : true);
      if (searchBeds === '2+') result = result.filter((p: any) => typeof p.beds === 'number' && p.beds >= 2);
      if (searchBeds === '3+') result = result.filter((p: any) => typeof p.beds === 'number' && p.beds >= 3);
    }
    setFilteredProperties(result);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSearchNeighborhood('Select location');
    setSearchPrice(3000000);
    setSearchBeds('Any');
    setFilteredProperties(properties);
    setHasSearched(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase.from('properties').select('*, landlord:profiles(*)');
      if (data && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          location: p.location,
          neighborhood: p.neighborhood,
          price: p.price,
          priceUSD: p.price_usd,
          beds: p.beds,
          baths: p.baths,
          size: p.size_sqm,
          imageUrl: p.main_image_url || 'https://via.placeholder.com/800x600?text=No+Image',
          galleryImages: p.gallery_images,
          verified: p.verified,
          amenities: p.amenities,
          description: p.description,
          agent: {
            name: p.landlord?.full_name || "Unknown Landlord",
            role: p.landlord?.role === 'landlord' ? 'Verified Landlord' : 'Partner',
            experience: 'New',
            imageUrl: p.landlord?.avatar_url || 'https://via.placeholder.com/150'
          }
        }));
        setProperties(mapped);
        setFilteredProperties(mapped);
      }
      setIsLoading(false);
    }
    fetchProperties();
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
        className={`fixed top-0 left-0 right-0 w-full max-w-max-width mx-auto z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-on-surface/95"
            : "bg-surface-container-lowest dark:bg-on-surface shadow-sm"
        }`}
      >
        <nav className="flex flex-row justify-between items-center w-full px-lg md:px-2xl py-sm">
          <div className="flex justify-between items-center w-full md:w-auto">
          <button onClick={() => window.location.reload()} className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity text-left bg-transparent border-none p-0 outline-none">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              domain
            </span>
            <span className="text-h3 font-h3 text-primary tracking-tight">
              Rent Connect
            </span>
          </button>
          <label htmlFor="mobile-menu" className="md:hidden flex items-center p-1 text-primary cursor-pointer">
            <span className="material-symbols-outlined text-[32px]">menu</span>
          </label>
        </div>
        <input type="checkbox" id="mobile-menu" className="peer hidden" />
          <div className="hidden md:flex items-center gap-xl peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:right-0 peer-checked:bg-surface-container-lowest peer-checked:dark:bg-on-surface peer-checked:border-t peer-checked:border-outline-variant/30 peer-checked:flex-col peer-checked:items-stretch peer-checked:p-md peer-checked:shadow-lg peer-checked:z-50">
            <Link
              className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
              href="/search"
            >
              Search
            </Link>
            <Link
              className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
              href="/messages"
            >
              Messages
            </Link>
            <Link
              className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
              href="/dashboard"
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center gap-md">
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
            <div className="max-w-[896px] mx-auto w-full px-md md:px-0">
              <div className="bg-surface-container-lowest shadow-xl shadow-primary/5 rounded-3xl md:rounded-full p-xs md:p-sm flex flex-col md:flex-row items-center gap-xs md:gap-0 border border-outline-variant/40">
                {/* Neighborhood Filter */}
                <div className="flex-1 w-full flex items-center px-lg py-sm md:py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm border-b border-outline-variant/30 md:border-b-0 md:border-r group cursor-pointer hover:bg-surface-container-low transition-colors rounded-t-3xl md:rounded-none md:rounded-l-full">
                  <span className="material-symbols-outlined text-primary mr-sm text-[28px]">
                    location_on
                  </span>
                  <div className="text-left overflow-hidden flex-1">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">
                      Neighborhood
                    </p>
                    <select 
                      value={searchNeighborhood}
                      onChange={(e) => {
                        setSearchNeighborhood(e.target.value);
                        setHasSearched(false);
                      }}
                      className="bg-transparent border-none p-0 focus:ring-0 font-label-lg text-on-surface w-full appearance-none outline-none cursor-pointer font-medium"
                    >
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
                <div className="flex-1 w-full px-lg py-sm md:py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm border-b border-outline-variant/30 md:border-b-0 md:border-r cursor-pointer hover:bg-surface-container-low transition-colors group">
                  <div className="text-left">
                    <div className="flex justify-between items-end mb-1">
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Max Price
                      </p>
                      <span className="font-label-sm text-primary font-semibold">{formatPrice(searchPrice)}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <input
                        className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                        max="5000000"
                        min="200000"
                        step="50000"
                        type="range"
                        value={searchPrice}
                        onChange={(e) => {
                          setSearchPrice(Number(e.target.value));
                          setHasSearched(false);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms Count */}
                <div className="flex-1 w-full px-lg py-sm md:py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm cursor-pointer hover:bg-surface-container-low transition-colors md:rounded-r-none">
                  <div className="text-left flex flex-col justify-center h-full">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                      Bedrooms
                    </p>
                    <div className="flex items-center gap-xs">
                      {['Any', '1+', '2+', '3+'].map(bed => (
                        <button 
                          key={bed}
                          onClick={() => {
                            setSearchBeds(bed);
                            setHasSearched(false);
                          }}
                          className={`flex-1 min-w-[40px] h-8 rounded-full border flex items-center justify-center font-label-sm transition-all ${
                            searchBeds === bed 
                              ? 'border-primary bg-primary text-white shadow-sm' 
                              : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                          }`}
                        >
                          {bed}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search Action */}
                <div className="w-full md:w-auto px-sm md:pr-xs md:pl-sm mt-xs md:mt-0 pb-sm md:pb-0">
                  {hasSearched ? (
                    <button 
                      onClick={clearFilters}
                      className="w-full md:w-[56px] h-12 md:h-[56px] bg-error/10 text-error rounded-full flex items-center justify-center gap-sm hover:bg-error/20 transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[28px]">close</span>
                      <span className="md:hidden font-label-md font-medium">Clear Filters</span>
                    </button>
                  ) : (
                    <button 
                      onClick={applyFilters}
                      className="w-full md:w-[56px] h-12 md:h-[56px] bg-primary text-on-primary rounded-full flex items-center justify-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[28px]">search</span>
                      <span className="md:hidden font-label-md font-medium">Search Homes</span>
                    </button>
                  )}
                </div>
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
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${showAdvancedFilters ? 'bg-primary border-primary text-white' : 'border-outline-variant hover:bg-surface-container-low text-on-surface'}`}
              >
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="mb-xl p-xl bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-sm animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="flex items-center justify-between mb-lg">
                <h3 className="font-h3 text-h3 text-on-surface">Advanced Filters</h3>
                <button 
                  onClick={() => {
                    setSearchNeighborhood('Select location');
                    setSearchPrice(3000000);
                    setSearchBeds('Any');
                    setFilteredProperties(properties);
                  }} 
                  className="text-primary font-label-md hover:underline active:opacity-70"
                >
                  Reset All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
                 <div className="space-y-sm">
                   <p className="font-label-md text-on-surface font-medium">Property Type</p>
                   <select className="w-full border border-outline-variant/60 rounded-xl p-md bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md transition-all">
                     <option>Any Type</option>
                     <option>Apartment</option>
                     <option>Standalone House</option>
                     <option>Villa</option>
                     <option>Studio</option>
                   </select>
                 </div>
                 <div className="space-y-sm">
                   <p className="font-label-md text-on-surface font-medium">Must-Have Amenities</p>
                   <div className="grid grid-cols-2 gap-sm">
                     <label className="flex items-center gap-sm cursor-pointer group">
                       <input type="checkbox" className="rounded-md w-5 h-5 border-outline-variant text-primary focus:ring-primary transition-all"/> 
                       <span className="font-body-md group-hover:text-primary transition-colors">WiFi</span>
                     </label>
                     <label className="flex items-center gap-sm cursor-pointer group">
                       <input type="checkbox" className="rounded-md w-5 h-5 border-outline-variant text-primary focus:ring-primary transition-all"/> 
                       <span className="font-body-md group-hover:text-primary transition-colors">Parking</span>
                     </label>
                     <label className="flex items-center gap-sm cursor-pointer group">
                       <input type="checkbox" className="rounded-md w-5 h-5 border-outline-variant text-primary focus:ring-primary transition-all"/> 
                       <span className="font-body-md group-hover:text-primary transition-colors">Pool</span>
                     </label>
                     <label className="flex items-center gap-sm cursor-pointer group">
                       <input type="checkbox" className="rounded-md w-5 h-5 border-outline-variant text-primary focus:ring-primary transition-all"/> 
                       <span className="font-body-md group-hover:text-primary transition-colors">Security</span>
                     </label>
                   </div>
                 </div>
                 <div className="space-y-sm">
                   <p className="font-label-md text-on-surface font-medium">Availability</p>
                   <label className="flex items-center gap-sm cursor-pointer group">
                     <input type="checkbox" defaultChecked className="rounded-md w-5 h-5 border-outline-variant text-primary focus:ring-primary transition-all"/> 
                     <span className="font-body-md group-hover:text-primary transition-colors">Show only available now</span>
                   </label>
                 </div>
              </div>
            </div>
          )}

          {/* Bento-like Grid System */}
          {isLoading ? (
            <div className="w-full flex justify-center py-2xl text-primary">
              <span className="material-symbols-outlined animate-spin text-4xl">refresh</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
              {filteredProperties.length === 0 ? (
                <div className="col-span-full py-3xl text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-6xl text-outline-variant mb-md">search_off</span>
                  <h3 className="font-h3 text-on-surface mb-xs">No properties found</h3>
                  <p className="text-on-surface-variant font-body-md">Try adjusting your search criteria or resetting filters.</p>
                </div>
              ) : (
                filteredProperties.map((property) => (
                <Link
                  href={`/property/${property.id}`}
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
              </Link>
            )))}


          </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface border-t border-outline-variant mt-auto">
          <div className="space-y-sm text-center md:text-left">
            <div className="flex items-center gap-sm">
            <span
              className="material-symbols-outlined text-primary text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              domain
            </span>
            <span className="text-label-md font-label-md text-primary tracking-tight">
              Rent Connect
            </span>
          </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[320px]">
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
      </footer>
    </div>
  );
}

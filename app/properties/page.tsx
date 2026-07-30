"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function PropertiesPage() {
  const { role } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const properties = [
    {
      id: 1,
      title: "Kacyiru Modern Suite",
      location: "Kacyiru, Kigali",
      price: "800,000",
      status: "Vacant",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Nyarutarama Luxury Villa",
      location: "Nyarutarama, Kigali",
      price: "1,500,000",
      status: "Occupied",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Kimihurura Cozy Studio",
      location: "Kimihurura, Kigali",
      price: "400,000",
      status: "Maintenance",
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="bg-[#f8f9ff] text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex flex-row justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface shadow-sm relative">
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
        <nav className="hidden md:flex items-center gap-xl peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:right-0 peer-checked:bg-surface-container-lowest peer-checked:dark:bg-on-surface peer-checked:border-t peer-checked:border-outline-variant/30 peer-checked:flex-col peer-checked:items-stretch peer-checked:p-md peer-checked:shadow-lg peer-checked:z-50">
          {role === "landlord" ? (
            <>
              <Link className="font-label-md text-label-md text-primary font-bold border-b-2 border-transparent py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/properties">
                My Properties
              </Link>
              <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/tenants">
                Tenants
              </Link>
            </>
          ) : (
            <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/search">
              Search
            </Link>
          )}
          <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/messages">
            Messages
          </Link>
          <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/dashboard">
            Profile
          </Link>
        </nav>
      </header>

      <main className="max-w-max-width mx-auto w-full px-lg md:px-2xl py-2xl flex-1">
        
        {showAddForm ? (
          <div className="bg-white rounded-2xl shadow-lg border border-outline-variant/30 overflow-hidden mb-xl">
            <div className="bg-surface-container px-xl py-lg border-b border-outline-variant/30 flex justify-between items-center">
              <div>
                <h2 className="font-h3 text-h3 text-on-surface">Publish New Property</h2>
                <p className="font-body-sm text-on-surface-variant">Fill in the details to list your property on Rent Connect Kigali.</p>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-outline-variant/20 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="p-xl space-y-xl" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="md:col-span-2 space-y-sm">
                  <label className="font-label-md text-on-surface">Property Title</label>
                  <input className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" placeholder="e.g. Modern 3BR Apartment in Nyarutarama" type="text" />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Monthly Rent (RWF)</label>
                  <input className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" placeholder="800,000" type="number" />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Location / Neighborhood</label>
                  <select className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none bg-white">
                    <option>Nyarutarama</option>
                    <option>Kimihurura</option>
                    <option>Kiyovu</option>
                    <option>Kacyiru</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-md">
                <label className="font-label-md text-on-surface">Essential Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                  {['WiFi', 'Security', 'Backup Power', 'Parking'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input className="rounded text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                      <span className="font-body-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Media Upload Zones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Property Photos
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer h-32">
                    <span className="material-symbols-outlined text-primary">
                      add_a_photo
                    </span>
                    <span className="font-label-sm text-label-sm text-outline mt-xs">
                      Add up to 10 photos
                    </span>
                  </div>
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Video Tour (Optional)
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer h-32">
                    <span className="material-symbols-outlined text-primary">
                      videocam
                    </span>
                    <span className="font-label-sm text-label-sm text-outline mt-xs">
                      Upload MP4 or MOV
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-md">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-lg py-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors rounded-xl">Cancel</button>
                <button type="submit" className="px-xl py-md bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all shadow-md flex items-center gap-sm">
                  <span className="material-symbols-outlined">publish</span>
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
              <div>
                <h1 className="font-h2 text-h2 text-on-surface">My Properties</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manage your property portfolio and listings.</p>
              </div>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-on-primary px-xl py-md rounded-xl font-label-md flex items-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined">add</span>
                Add New Property
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
              <div className="bg-white p-lg rounded-2xl border border-outline-variant/50 shadow-sm flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">apartment</span>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Total Properties</p>
                  <p className="font-h2 text-on-surface">0</p>
                </div>
              </div>
              <div className="bg-white p-lg rounded-2xl border border-outline-variant/50 shadow-sm flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Occupied</p>
                  <p className="font-h2 text-on-surface">0</p>
                </div>
              </div>
              <div className="bg-white p-lg rounded-2xl border border-outline-variant/50 shadow-sm flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                  <span className="material-symbols-outlined">door_open</span>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Vacant</p>
                  <p className="font-h2 text-on-surface">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-outline-variant/50 border-dashed p-3xl flex flex-col items-center justify-center text-center shadow-sm w-full min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-primary/40 mb-md">
                <span className="material-symbols-outlined text-5xl">holiday_village</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-xs">No Properties Yet</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[500px] mb-lg mt-sm text-center">
                You haven't added any properties to your portfolio. Start by publishing your first listing to attract quality tenants.
              </p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-on-primary px-xl py-sm rounded-xl font-label-md flex items-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm"
              >
                <span className="material-symbols-outlined">add</span>
                Add Your First Property
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

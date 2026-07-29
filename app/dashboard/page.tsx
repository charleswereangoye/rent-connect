"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, role, isLoading, signOut } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      alert(`File "${e.dataTransfer.files[0].name}" received. In a real app, this would begin the secure upload process.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`File "${e.target.files[0].name}" selected.`);
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface shadow-sm">
        <div className="flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            domain
          </span>
          <Link href="/" className="text-h3 font-h3 text-primary tracking-tight">
            Rent Connect
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-xl">
          <Link
            className="font-label-md text-label-md text-on-secondary-container hover:text-primary transition-colors py-xs"
            href="/search"
          >
            Search
          </Link>
          <Link
            className="font-label-md text-label-md text-on-secondary-container hover:text-primary transition-colors py-xs"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-xs"
            href="/dashboard"
          >
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-md">
          {role === "landlord" && (
            <button className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-opacity-90 transition-all active:opacity-80">
              Post a Listing
            </button>
          )}
        </div>
      </header>

      {/* Verification Banner */}
      {role === "landlord" && (
        <div className="w-full bg-[#D97706]/10 border-l-4 border-[#D97706] py-md px-lg flex items-center gap-md">
          <span className="material-symbols-outlined text-[#D97706]">warning</span>
          <p className="font-body-md text-body-md text-[#D97706] font-medium">
            Account Pending Verification: Upload your National ID to unlock property publishing access.
          </p>
        </div>
      )}

      <main className="max-w-max-width mx-auto w-full px-lg md:px-2xl py-2xl grid grid-cols-1 lg:grid-cols-3 gap-xl flex-1">
        {/* Left Side */}
        <section className="lg:col-span-1 space-y-lg">
          {role === "landlord" && (
            <div className="bg-white/70 backdrop-blur-md border border-white/30 p-xl rounded-xl shadow-sm space-y-md">
              <h2 className="font-h3 text-h3 text-primary">Identity Verification</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                To maintain a secure marketplace in Kigali, we require all landlords to
                verify their identity using a valid Rwanda National ID.
              </p>
              <div
                className={`rounded-xl p-2xl flex flex-col items-center justify-center gap-sm cursor-pointer transition-colors group ${
                  isDragging ? "bg-primary-container/10 border-primary" : "hover:bg-surface-container"
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2300685FFF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform">
                  cloud_upload
                </span>
                <p className="font-label-md text-label-md text-primary">
                  Drag &amp; Drop ID Card
                </p>
                <p className="font-label-sm text-label-sm text-outline">
                  JPEG or PNG, Max 5MB
                </p>
                <input
                  accept="image/*"
                  className="hidden"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <div className="bg-surface-container-low p-md rounded-lg flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  info
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Your data is encrypted and used only for verification purposes
                  according to Rwandan data protection laws.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="h-24 bg-gradient-to-r from-primary-container to-primary/80 relative">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
            </div>
            <div className="px-xl pb-xl relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-surface-container-high flex items-center justify-center overflow-hidden -mt-12 shadow-md">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    className="w-full h-full object-cover"
                    src={user.user_metadata.avatar_url}
                    alt={user?.user_metadata?.full_name || "User"}
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-4xl">person</span>
                )}
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mt-sm">
                {user?.user_metadata?.full_name || "New User"}
              </h3>
              <p className="font-label-sm text-label-sm text-primary bg-primary/10 px-md py-xs rounded-full mt-xs capitalize font-medium">
                {role} Account
              </p>
              
              {role === "landlord" && (
                <div className="flex items-center justify-center gap-xs mt-md bg-[#D97706]/10 px-md py-xs rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-[#D97706] font-medium">
                    Verification in progress
                  </span>
                </div>
              )}

              <div className="w-full h-px bg-outline-variant/30 my-lg"></div>
              
              <button 
                className="w-full flex items-center justify-center gap-sm py-sm text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all font-label-md"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="lg:col-span-2">
          {role === "renter" ? (
            <div className="space-y-lg">
              {/* Premium Welcome Banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container p-xl rounded-2xl shadow-lg shadow-primary/20 text-left flex flex-col md:flex-row items-center gap-lg">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
                
                <div className="flex-1 relative z-10">
                  <h2 className="font-h2 text-h2 text-white mb-xs tracking-tight flex items-center gap-sm">
                    Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || "Renter"}!
                    <span className="material-symbols-outlined text-[32px]">waving_hand</span>
                  </h2>
                  <p className="font-body-md text-body-md text-white/90 max-w-[80%]">
                    Ready to find your next home? Browse verified listings, communicate securely with landlords, and manage your applications effortlessly.
                  </p>
                </div>
                <div className="hidden md:flex relative z-10 w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-md items-center justify-center border border-white/30 transform rotate-3 hover:rotate-0 transition-transform">
                   <span className="material-symbols-outlined text-white text-5xl">holiday_village</span>
                </div>
              </div>

              {/* Profile Settings Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-outline-variant/30 overflow-hidden">
                <div className="px-xl py-lg border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
                  <div>
                    <h2 className="font-h3 text-h3 text-on-surface">Personal Information</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Update your photo and personal details here.</p>
                  </div>
                  {!isEditingProfile && (
                    <button type="button" onClick={() => setIsEditingProfile(true)} className="flex items-center gap-xs px-md py-sm bg-surface-container hover:bg-surface-container-high text-primary font-label-md rounded-lg transition-colors border border-outline-variant/50">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Edit
                    </button>
                  )}
                </div>
                <form className="p-xl space-y-xl" onSubmit={(e) => { e.preventDefault(); alert('Profile settings saved successfully!'); setIsEditingProfile(false); }}>
                  
                  {/* Avatar upload section */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-lg p-lg bg-surface-container-lowest rounded-xl border border-outline-variant/50">
                    <div className={`relative group ${isEditingProfile ? 'cursor-pointer' : ''}`} onClick={() => isEditingProfile && fileInputRef.current?.click()}>
                      <div className={`w-24 h-24 rounded-full bg-surface-container-high border-4 border-white shadow-md flex items-center justify-center overflow-hidden transition-transform ${isEditingProfile ? 'group-hover:scale-105' : ''}`}>
                        {user?.user_metadata?.avatar_url ? (
                          <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-primary text-4xl">person</span>
                        )}
                        {isEditingProfile && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white">photo_camera</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {isEditingProfile ? (
                      <div className="space-y-sm">
                        <div className="flex gap-md">
                          <button 
                            type="button" 
                            className="px-lg py-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm active:scale-95"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Upload New
                          </button>
                          <button 
                            type="button" 
                            className="px-lg py-sm bg-surface-container text-error rounded-xl font-label-md text-label-md hover:bg-error/10 transition-all active:scale-95"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="font-label-sm text-label-sm text-outline">
                          At least 500x500 px recommended. Max 5MB.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-xs">
                        <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">Change Profile</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Your current profile picture.</p>
                      </div>
                    )}
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                    <div className="space-y-sm group">
                      <label className="font-label-md text-label-md text-on-surface group-focus-within:text-primary transition-colors">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">person</span>
                        <input
                          type="text"
                          defaultValue={user?.user_metadata?.full_name || ""}
                          disabled={!isEditingProfile}
                          className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-12 pr-md py-sm font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-80 disabled:bg-surface-container-low"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-sm group">
                      <label className="font-label-md text-label-md text-on-surface group-focus-within:text-primary transition-colors">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                        <input
                          type="email"
                          defaultValue={user?.email || ""}
                          disabled={!isEditingProfile}
                          className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-12 pr-md py-sm font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-80 disabled:bg-surface-container-low"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-sm group">
                      <label className="font-label-md text-label-md text-on-surface group-focus-within:text-primary transition-colors">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">phone</span>
                        <input
                          type="tel"
                          defaultValue={user?.user_metadata?.phone || ""}
                          disabled={!isEditingProfile}
                          className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-12 pr-md py-sm font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-80 disabled:bg-surface-container-low"
                          placeholder="+250 7XX XXX XXX"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex justify-end items-center gap-md pt-lg border-t border-outline-variant/30 mt-xl">
                      <button
                        className="px-xl py-sm font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-container rounded-xl transition-all active:scale-95"
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-primary text-on-primary px-xl py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-sm"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
            <div className="bg-surface-container px-xl py-lg border-b border-outline-variant/30">
              <div className="flex items-center justify-between">
                <h2 className="font-h3 text-h3 text-on-surface">
                  Publish New Property
                </h2>
                <div className="flex items-center gap-xs">
                  <div className="w-8 h-1.5 rounded-full bg-primary"></div>
                  <div className="w-8 h-1.5 rounded-full bg-outline-variant"></div>
                  <div className="w-8 h-1.5 rounded-full bg-outline-variant"></div>
                </div>
              </div>
            </div>
            <form className="p-xl space-y-xl" onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="md:col-span-2 space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Property Title
                  </label>
                  <input
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm font-body-md text-body-md outline-none"
                    placeholder="e.g. Modern 3BR Apartment in Nyarutarama"
                    type="text"
                  />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Monthly Rent (RWF)
                  </label>
                  <input
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm font-body-md text-body-md outline-none"
                    placeholder="800,000"
                    type="number"
                  />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Location / Neighborhood
                  </label>
                  <select className="w-full border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm font-body-md text-body-md outline-none bg-white">
                    <option>Nyarutarama</option>
                    <option>Kimihurura</option>
                    <option>Kiyovu</option>
                    <option>Rebero</option>
                    <option>Kacyiru</option>
                  </select>
                </div>
              </div>

              {/* Amenities Bento */}
              <div className="space-y-md">
                <label className="font-label-md text-label-md text-on-surface">
                  Essential Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                  <label className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input
                      className="rounded text-primary focus:ring-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm">WiFi</span>
                  </label>
                  <label className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input
                      className="rounded text-primary focus:ring-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm">Security</span>
                  </label>
                  <label className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input
                      className="rounded text-primary focus:ring-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm">
                      Backup Power
                    </span>
                  </label>
                  <label className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input
                      className="rounded text-primary focus:ring-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm">Parking</span>
                  </label>
                </div>
              </div>

              {/* Media Upload Zones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Property Photos
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer">
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
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-primary">
                      videocam
                    </span>
                    <span className="font-label-sm text-label-sm text-outline mt-xs">
                      Upload MP4 or MOV
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-md pt-lg border-t border-outline-variant/30">
                <button
                  className="px-xl py-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  type="button"
                >
                  Save as Draft
                </button>
                <button
                  className="bg-primary text-white px-2xl py-sm rounded-xl font-label-md text-label-md shadow-md hover:bg-opacity-90 transition-all flex items-center gap-sm"
                  type="submit"
                >
                  Continue to Preview
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>
          )}

          {/* Recently Drafted */}
          {role === "landlord" && (
          <div className="mt-xl">
            <h4 className="font-label-md text-label-md text-on-surface mb-md">
              Quick Drafts
            </h4>
            <div className="flex flex-wrap gap-md">
              <div className="bg-white border border-outline-variant/30 rounded-lg p-sm flex items-center gap-md pr-lg">
                <div className="w-12 h-12 rounded bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjxR-U6slneoXUdU_SMHcKzckueU90H02N7G8Mg-IsOaDuy-liUGCq1Wyy_MdZtWX8lNAQ_CGW4EUM3Eao_QaRl9ngEKivZ7AEHITBwpmbbO75kwfM519LwKRyBAhMpeNjPh5CX9kHq5hC4y8rlPSsabcDoPiYbmBgP7OxF8_zyBphIkvqxWkEu21aVJoTRVdthb2rAPNZlP7xrlJ0pf_aio3EO_DoQ1ucUmG2nT9gM5qKKDMp-9xjChOpT0wH0JJt1o1rkKQ"
                    alt="Draft Property"
                  />
                </div>
                <div>
                  <p className="font-label-sm text-label-sm">
                    Kacyiru Modern Suite
                  </p>
                  <p className="text-[10px] text-outline uppercase font-bold tracking-wider">
                    Drafted 2h ago
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-low dark:bg-on-secondary-fixed border-t border-outline-variant mt-auto">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <div className="text-label-md font-label-md text-primary dark:text-primary-fixed">
            Rent Connect
          </div>
          <p className="font-body-sm text-body-sm text-on-surface dark:text-surface-variant">
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

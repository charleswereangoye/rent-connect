"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const { user, role, isLoading, signOut } = useAuth();
  const supabase = createClient();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
      setPhone(user.user_metadata?.phone || "");
      
      const status = user.user_metadata?.verification_status;
      if (status === 'verified') setIsVerified(true);
      else setIsVerified(false);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    let newAvatarUrl = user?.user_metadata?.avatar_url;
    
    if (avatarFile && user) {
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });
        
      if (error) {
        alert(`Error uploading avatar: ${error.message}. Ensure 'avatars' bucket exists and is public in Supabase.`);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        newAvatarUrl = publicUrlData.publicUrl;
      }
    }

    const { error } = await supabase.auth.updateUser({
      email: email !== user?.email ? email : undefined,
      data: {
        full_name: fullName,
        phone: phone,
        avatar_url: newAvatarUrl
      }
    });

    if (error) {
      alert(`Error updating profile: ${error.message}`);
    } else {
      setIsEditingProfile(false);
      setAvatarFile(null);
    }
    setIsSaving(false);
  };

  const processFileVerification = async (file: File) => {
    setIsVerifying(true);
    setVerificationError(null);
    
    if (user) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-id-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('identities')
        .upload(filePath, file);

      if (uploadError) {
        setVerificationError(`Error uploading ID: ${uploadError.message}. Make sure you created an 'identities' bucket.`);
        setIsVerifying(false);
        return;
      }

      await supabase.auth.updateUser({
        data: { verification_status: 'in_progress' }
      });
    }
    
    setTimeout(async () => {
      const userName = user?.user_metadata?.full_name?.toLowerCase() || "";
      const firstName = userName.split(" ")[0] || "";
      
      // Simple logic: check if the file name contains the user's first name
      if (firstName && file.name.toLowerCase().includes(firstName)) {
        if (user) {
          await supabase.auth.updateUser({
            data: { verification_status: 'verified' }
          });
        }
        setIsVerified(true);
        setIsVerifying(false);
      } else {
        if (user) {
          await supabase.auth.updateUser({
            data: { verification_status: 'not_verified' }
          });
        }
        setVerificationError(`Verification failed. The uploaded ID (${file.name}) does not appear to match the registered name: ${user?.user_metadata?.full_name || 'Unknown'}. Please ensure the file name contains your first name.`);
        setIsVerifying(false);
      }
    }, 1500);
  };

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
      processFileVerification(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileVerification(e.target.files[0]);
    }
  };

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
              <Link
                className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
                href="/properties"
              >
                My Properties
              </Link>
              <Link
                className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
                href="/tenants"
              >
                Tenants
              </Link>
            </>
          ) : (
            <Link
              className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
              href="/search"
            >
              Search
            </Link>
          )}
          <Link
            className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="font-label-md text-label-md text-primary font-bold border-b-2 border-transparent py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
            href="/dashboard"
          >
            Profile
          </Link>
        </nav>
      </header>

      {/* Verification Banner */}
      {role === "landlord" && !isVerified && (
        <div className="w-full bg-[#D97706]/10 border-l-4 border-[#D97706] py-md px-lg flex items-center justify-center gap-md text-center">
          <span className="material-symbols-outlined text-[#D97706]">warning</span>
          <p className="font-body-md text-body-md text-[#D97706] font-medium">
            Account Pending Verification: Upload your National ID to unlock property publishing access.
          </p>
        </div>
      )}

      <main className="max-w-max-width mx-auto w-full px-lg md:px-2xl py-2xl grid grid-cols-1 lg:grid-cols-3 gap-xl flex-1">
        {/* Left Side */}
        <section className="lg:col-span-1 space-y-lg flex flex-col order-2 lg:order-1">
          <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 border border-outline-variant/30 overflow-hidden flex flex-col order-1">
            <div className="h-24 bg-gradient-to-r from-primary-container to-primary/80 relative">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
            </div>
            <div className="px-xl pb-xl relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-surface-container-high flex items-center justify-center overflow-hidden -mt-12 shadow-md">
                {avatarPreview ? (
                  <img
                    className="w-full h-full object-cover"
                    src={avatarPreview}
                    alt={user?.user_metadata?.full_name || "User"}
                  />
                ) : user?.user_metadata?.avatar_url ? (
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
              <p className="font-label-sm text-label-sm text-primary bg-primary/10 px-md py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm rounded-full mt-xs capitalize font-medium">
                {role} Account
              </p>
              
              {role === "landlord" && !isVerified && (
                <div className="flex items-center justify-center gap-xs mt-md bg-[#D97706]/10 px-md py-xs rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-[#D97706] font-medium">
                    Verification in progress
                  </span>
                </div>
              )}
              {role === "landlord" && isVerified && (
                <div className="flex items-center justify-center gap-xs mt-md bg-[#059669]/10 px-md py-xs rounded-full">
                  <span className="material-symbols-outlined text-[#059669] text-[16px]">verified</span>
                  <span className="font-label-sm text-label-sm text-[#059669] font-medium">
                    KYC Verified
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

          {role === "landlord" && !isVerified && (
            <div className="bg-white/70 backdrop-blur-md border border-white/30 p-xl rounded-xl shadow-sm space-y-md order-2 relative">
              {isVerifying && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                  <span className="material-symbols-outlined text-primary text-4xl animate-spin mb-sm">refresh</span>
                  <p className="font-label-md text-primary font-bold">Verifying ID...</p>
                </div>
              )}
              <h2 className="font-h3 text-h3 text-primary">Identity Verification</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                To maintain a secure marketplace in Kigali, we require all landlords to
                verify their identity using a valid Rwanda National ID.
              </p>
              
              {verificationError && (
                <div className="bg-error-container text-on-error-container p-sm rounded-lg text-sm font-medium">
                  {verificationError}
                </div>
              )}

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
                  according to Rwandan data protection laws. We value your privacy.
                </p>
              </div>
            </div>
          )}

          {role === "landlord" && isVerified && (
            <div className="bg-primary/5 border border-primary/20 p-xl rounded-xl space-y-md text-center flex flex-col items-center justify-center order-2 h-full min-h-[300px]">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-sm shadow-inner">
                <span className="material-symbols-outlined text-[48px]">verified_user</span>
              </div>
              <h2 className="font-h3 text-h3 text-primary">Identity Verified</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[300px]">
                Your identity has been successfully verified. You now have full access to publish and manage properties on Rent Connect.
              </p>
            </div>
          )}

        </section>

        {/* Right Side */}
        <section className="lg:col-span-2 order-1 lg:order-2">
            <div className="space-y-lg">
              {/* Premium Welcome Banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container p-xl rounded-2xl shadow-lg shadow-primary/20 text-left flex flex-col md:flex-row items-center gap-lg">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
                
                <div className="flex-1 relative z-10">
                  <h2 className="font-h2 text-h2 text-white mb-xs tracking-tight flex items-center gap-sm">
                    Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || "User"}!
                    <span className="material-symbols-outlined text-[32px]">waving_hand</span>
                  </h2>
                  <p className="font-body-md text-body-md text-white/90 max-w-[80%]">
                    {role === "landlord" 
                      ? "Ready to manage your portfolio? Keep track of your properties, communicate securely with tenants, and oversee your rentals effortlessly."
                      : "Ready to find your next home? Browse verified listings, communicate securely with landlords, and manage your applications effortlessly."}
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
                <form className="p-xl space-y-xl" onSubmit={handleProfileSave}>
                  
                  {/* Avatar upload section */}
                  <div className="flex flex-col md:flex-row items-center md:items-center gap-lg p-lg bg-surface-container-lowest rounded-xl border border-outline-variant/50 text-center md:text-left">
                    <div className={`relative group ${isEditingProfile ? 'cursor-pointer' : ''}`} onClick={() => isEditingProfile && avatarInputRef.current?.click()}>
                      <div className={`w-24 h-24 rounded-full bg-surface-container-high border-4 border-white shadow-md flex items-center justify-center overflow-hidden transition-transform ${isEditingProfile ? 'group-hover:scale-105' : ''}`}>
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : user?.user_metadata?.avatar_url ? (
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
                            onClick={() => avatarInputRef.current?.click()}
                          >
                            Upload New
                          </button>
                          <button 
                            type="button" 
                            className="px-lg py-sm bg-surface-container text-error rounded-xl font-label-md text-label-md hover:bg-error/10 transition-all active:scale-95"
                            onClick={() => setAvatarPreview(null)}
                          >
                            Remove
                          </button>
                        </div>
                        <p className="font-label-sm text-label-sm text-outline">
                          At least 500x500 px recommended. Max 5MB.
                        </p>
                        <input
                          accept="image/*"
                          className="hidden"
                          type="file"
                          ref={avatarInputRef}
                          onChange={handleAvatarChange}
                        />
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
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={!isEditingProfile || isSaving}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={!isEditingProfile || isSaving}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={!isEditingProfile || isSaving}
                          className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-12 pr-md py-sm font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-80 disabled:bg-surface-container-low"
                          placeholder="+250 7XX XXX XXX"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex justify-end gap-md pt-lg border-t border-outline-variant/30 mt-xl">
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsEditingProfile(false);
                          setAvatarPreview(null);
                          setAvatarFile(null);
                          if (user) {
                            setFullName(user.user_metadata?.full_name || "");
                            setEmail(user.email || "");
                            setPhone(user.user_metadata?.phone || "");
                          }
                        }}
                        className="px-xl py-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md rounded-xl transition-colors border border-outline-variant/50"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-xl py-sm bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-md rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-xs"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-low dark:bg-on-secondary-fixed border-t border-outline-variant mt-auto">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <div className="flex items-center justify-center md:justify-start gap-sm">
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
          <p className="font-body-sm text-body-sm text-on-surface dark:text-surface-variant text-center md:text-left">
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

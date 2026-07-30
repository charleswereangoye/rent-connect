"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function PropertiesPage() {
  const { role, user } = useAuth();
  const supabase = createClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [fetchedProps, setFetchedProps] = useState<any[]>([]);
  const [isLoadingProps, setIsLoadingProps] = useState(true);

  const fetchMyProperties = async () => {
    if (!user) return;
    setIsLoadingProps(true);
    const { data } = await supabase.from('properties').select('*').eq('landlord_id', user.id).order('created_at', { ascending: false });
    if (data) setFetchedProps(data);
    setIsLoadingProps(false);
  };

  useEffect(() => {
    if (user) {
      fetchMyProperties();
    }
  }, [user]);

  const updatePropertyStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('properties').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setFetchedProps(fetchedProps.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } else {
      alert("Failed to update status: " + error.message);
      console.error(error);
    }
  };

  const occupiedCount = fetchedProps.filter(p => p.status === 'Occupied').length;
  const vacantCount = fetchedProps.length - occupiedCount;

  const resetForm = () => {
    setShowAddForm(false);
    setEditingPropertyId(null);
    setTitle("");
    setRent("");
    setLocation("Nyarutarama");
    setBeds(1);
    setBaths(1);
    setSize("");
    setDescription("");
    setAmenities([]);
    setPhotos([]);
    setVideo(null);
  };

  const startEditing = (p: any) => {
    setEditingPropertyId(p.id);
    setTitle(p.title);
    setRent(p.price?.toString() || "");
    setLocation(p.location || "Nyarutarama");
    setBeds(p.beds || 1);
    setBaths(p.baths || 1);
    setSize(p.size_sqm?.toString() || "");
    setDescription(p.description || "");
    setAmenities(p.amenities || []);
    setShowAddForm(true);
  };

  const deleteProperty = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (!error) {
        setFetchedProps(fetchedProps.filter(p => p.id !== id));
      } else {
        alert("Failed to delete property: " + error.message);
      }
    }
  };

  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState("Nyarutarama");
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const photosInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles].slice(0, 10)); // append up to 10 photos
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to publish.");
    if (!title || !rent) return alert("Title and rent are required.");
    setIsPublishing(true);

    const uploadedPhotos: string[] = [];
    let uploadedVideoUrl = null;

    try {
      // 1. Upload Photos
      for (const file of photos) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}-property-${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage.from('properties').upload(filePath, file);
        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(filePath);
        uploadedPhotos.push(publicUrlData.publicUrl);
      }

      // 2. Upload Video
      if (video) {
        const fileExt = video.name.split('.').pop();
        const filePath = `${user.id}-property-video-${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage.from('properties').upload(filePath, video);
        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(filePath);
        uploadedVideoUrl = publicUrlData.publicUrl;
      }

      // 3. Save to properties table
      if (editingPropertyId) {
        const updateData: any = {
          title,
          price: parseInt(rent) || 0,
          location,
          neighborhood: location,
          beds: parseInt(beds.toString()) || 1,
          baths: parseFloat(baths.toString()) || 1,
          size_sqm: parseInt(size) || 0,
          description,
          amenities,
        };

        if (uploadedPhotos.length > 0) {
          updateData.main_image_url = uploadedPhotos[0];
          updateData.gallery_images = uploadedPhotos;
        }

        const { error: dbError } = await supabase.from('properties').update(updateData).eq('id', editingPropertyId);
        if (dbError) throw dbError;

        alert("Property updated successfully!");
      } else {
        const { error: dbError } = await supabase.from('properties').insert({
          landlord_id: user.id,
          title,
          price: parseInt(rent) || 0,
          location,
          neighborhood: location,
          beds: parseInt(beds.toString()) || 1,
          baths: parseFloat(baths.toString()) || 1,
          size_sqm: parseInt(size) || 0,
          description,
          amenities,
          main_image_url: uploadedPhotos[0] || null,
          gallery_images: uploadedPhotos,
          verified: user.user_metadata?.verification_status === 'verified'
        });

        if (dbError) throw dbError;
        alert("Property published successfully!");
      }

      resetForm();
      fetchMyProperties();
    } catch (err: any) {
      alert(`Error saving property: ${err.message}. Make sure 'properties' bucket and table exist!`);
    } finally {
      setIsPublishing(false);
    }
  };

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
                <h2 className="font-h3 text-h3 text-on-surface">{editingPropertyId ? 'Edit Property' : 'Publish New Property'}</h2>
                <p className="font-body-sm text-on-surface-variant">{editingPropertyId ? 'Update your listing details.' : 'Fill in the details to list your property on Rent Connect Kigali.'}</p>
              </div>
              <button 
                type="button"
                onClick={resetForm}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-outline-variant/20 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="p-xl space-y-xl" onSubmit={handlePublish}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="md:col-span-2 space-y-sm">
                  <label className="font-label-md text-on-surface">Property Title</label>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" 
                    placeholder="e.g. Modern 3BR Apartment in Nyarutarama" 
                    type="text" 
                    required
                  />
                </div>
                
                <div className="md:col-span-2 space-y-sm">
                  <label className="font-label-md text-on-surface">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none resize-none h-24" 
                    placeholder="Describe the property, features, and neighborhood..." 
                    required
                  ></textarea>
                </div>

                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Monthly Rent (RWF)</label>
                  <input 
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" 
                    placeholder="800000" 
                    type="number" 
                    required
                  />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Location / Neighborhood</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none bg-white"
                  >
                    <option value="Nyarutarama">Nyarutarama</option>
                    <option value="Kimihurura">Kimihurura</option>
                    <option value="Kiyovu">Kiyovu</option>
                    <option value="Kacyiru">Kacyiru</option>
                  </select>
                </div>

                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Bedrooms</label>
                  <input 
                    value={beds}
                    onChange={(e) => setBeds(parseInt(e.target.value) || 0)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" 
                    type="number" 
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Bathrooms</label>
                  <input 
                    value={baths}
                    onChange={(e) => setBaths(parseFloat(e.target.value) || 0)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" 
                    type="number" 
                    step="0.5"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-sm">
                  <label className="font-label-md text-on-surface">Size (sqm) (Optional)</label>
                  <input 
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg focus:ring-primary px-md py-sm outline-none" 
                    placeholder="e.g. 150" 
                    type="number" 
                  />
                </div>
              </div>
              
              <div className="space-y-md">
                <label className="font-label-md text-on-surface">Essential Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                  {['WiFi', 'Security', 'Backup Power', 'Parking'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input 
                        className="rounded text-primary focus:ring-primary w-4 h-4" 
                        type="checkbox" 
                        checked={amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) setAmenities([...amenities, amenity]);
                          else setAmenities(amenities.filter(a => a !== amenity));
                        }}
                      />
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
                  <div 
                    onClick={() => photosInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer h-32"
                  >
                    <span className="material-symbols-outlined text-primary">
                      {photos.length > 0 ? "check_circle" : "add_a_photo"}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline mt-xs text-center">
                      {photos.length > 0 ? `${photos.length} photos selected` : "Add up to 10 photos"}
                    </span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={photosInputRef}
                    onChange={handlePhotosChange}
                  />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface">
                    Video Tour (Optional)
                  </label>
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-container transition-all cursor-pointer h-32"
                  >
                    <span className="material-symbols-outlined text-primary">
                      {video ? "check_circle" : "videocam"}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline mt-xs text-center">
                      {video ? video.name : "Upload MP4 or MOV"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime"
                    className="hidden"
                    ref={videoInputRef}
                    onChange={handleVideoChange}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-md">
                <button type="button" onClick={resetForm} disabled={isPublishing} className="px-lg py-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors rounded-xl disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isPublishing} className="px-xl py-md bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all shadow-md flex items-center gap-sm disabled:opacity-50">
                  {isPublishing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">publish</span>
                      {editingPropertyId ? 'Save Changes' : 'Publish Listing'}
                    </>
                  )}
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
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
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
                  <p className="font-h2 text-on-surface">{fetchedProps.length}</p>
                </div>
              </div>
              <div className="bg-white p-lg rounded-2xl border border-outline-variant/50 shadow-sm flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Occupied</p>
                  <p className="font-h2 text-on-surface">{occupiedCount}</p>
                </div>
              </div>
              <div className="bg-white p-lg rounded-2xl border border-outline-variant/50 shadow-sm flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                  <span className="material-symbols-outlined">door_open</span>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Vacant</p>
                  <p className="font-h2 text-on-surface">{vacantCount}</p>
                </div>
              </div>
            </div>

            {isLoadingProps ? (
              <div className="flex justify-center py-3xl">
                <span className="material-symbols-outlined text-primary text-4xl animate-spin">refresh</span>
              </div>
            ) : fetchedProps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                {fetchedProps.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col">
                    <div className="h-48 relative">
                      <img src={p.main_image_url || 'https://via.placeholder.com/800x600?text=No+Image'} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-sm left-sm backdrop-blur-md rounded-full shadow-sm">
                        <select 
                          value={p.status || 'Vacant'} 
                          onChange={(e) => updatePropertyStatus(p.id, e.target.value)}
                          className={`px-sm py-xs rounded-full font-label-sm outline-none cursor-pointer border-none shadow-sm appearance-none pr-md ${
                            (p.status || 'Vacant') === 'Occupied' 
                              ? 'bg-secondary/90 text-on-secondary' 
                              : 'bg-primary/90 text-on-primary'
                          }`}
                        >
                          <option value="Vacant" className="bg-white text-on-surface">Vacant</option>
                          <option value="Occupied" className="bg-white text-on-surface">Occupied</option>
                        </select>
                        <span className={`material-symbols-outlined absolute right-1.5 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none ${
                            (p.status || 'Vacant') === 'Occupied' ? 'text-on-secondary' : 'text-on-primary'
                          }`}>
                          expand_more
                        </span>
                      </div>
                    </div>
                    <div className="p-lg flex flex-col flex-1">
                      <h3 className="font-h3 text-h3 text-on-surface mb-xs truncate">{p.title}</h3>
                      <p className="font-body-sm text-on-surface-variant mb-md flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {p.neighborhood || p.location}
                      </p>
                      <div className="flex gap-md mb-md font-label-sm text-on-surface-variant">
                        <span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">bed</span> {p.beds || 0}</span>
                        <span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">shower</span> {p.baths || 0}</span>
                        <span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">square_foot</span> {p.size_sqm || 0}m²</span>
                      </div>
                      <div className="mt-auto pt-md border-t border-outline-variant/30 flex justify-between items-center">
                        <span className="font-h3 text-primary">RWF {(p.price || p.monthly_rent || 0).toLocaleString()}</span>
                        <div className="flex items-center gap-xs">
                          <button onClick={() => startEditing(p)} className="text-primary hover:bg-primary-container p-sm rounded-full transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button onClick={() => deleteProperty(p.id)} className="text-error hover:bg-error-container p-sm rounded-full transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-outline-variant/50 border-dashed p-3xl flex flex-col items-center justify-center text-center shadow-sm w-full min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-primary/40 mb-md">
                <span className="material-symbols-outlined text-5xl">holiday_village</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-xs">No Properties Yet</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[500px] mb-lg mt-sm text-center">
                You haven&apos;t added any properties to your portfolio. Start by publishing your first listing to attract quality tenants.
              </p>
              <button 
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="bg-primary text-on-primary px-xl py-sm rounded-xl font-label-md flex items-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm"
              >
                <span className="material-symbols-outlined">add</span>
                Add Your First Property
              </button>
            </div>
          )}
          </>
        )}
      </main>
    </div>
  );
}

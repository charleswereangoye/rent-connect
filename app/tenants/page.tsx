"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function TenantsPage() {
  const { role } = useAuth();

  const tenants = [
    {
      id: 1,
      name: "Jean Pierre",
      email: "jean.pierre@example.com",
      phone: "+250 788 123 456",
      property: "Nyarutarama Luxury Villa",
      moveInDate: "Oct 1, 2025",
      rentStatus: "Paid",
      leaseEnd: "Sep 30, 2026",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      id: 2,
      name: "Alice Mutoni",
      email: "alice.m@example.com",
      phone: "+250 782 987 654",
      property: "Kimihurura Cozy Studio",
      moveInDate: "Jan 15, 2026",
      rentStatus: "Pending",
      leaseEnd: "Jan 14, 2027",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      id: 3,
      name: "David Smith",
      email: "dsmith99@example.com",
      phone: "+250 733 456 789",
      property: "Kacyiru Heights Apt 4B",
      moveInDate: "Mar 01, 2026",
      rentStatus: "Paid",
      leaseEnd: "Feb 28, 2027",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  return (
    <div className="bg-[#f8f9ff] text-on-surface min-h-screen flex flex-col">
      {/* Header */}
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
              <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/properties">
                My Properties
              </Link>
              <Link className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/tenants">
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

      {/* Main Content */}
      <main className="max-w-max-width mx-auto w-full px-lg md:px-2xl py-2xl flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h1 className="font-h2 text-h2 text-on-surface">Tenants Management</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Overview of all your active and pending tenants.</p>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search tenants..." 
              className="pl-2xl pr-md py-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm w-full md:w-64"
            />
          </div>
        </div>

        <div className="bg-white border border-outline-variant/50 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/50">
                  <th className="px-xl py-md font-label-md text-on-surface-variant">Tenant Info</th>
                  <th className="px-xl py-md font-label-md text-on-surface-variant">Property</th>
                  <th className="px-xl py-md font-label-md text-on-surface-variant">Lease Term</th>
                  <th className="px-xl py-md font-label-md text-on-surface-variant">Rent Status</th>
                  <th className="px-xl py-md font-label-md text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                <tr>
                  <td colSpan={5} className="px-xl py-3xl text-center whitespace-normal">
                    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
                      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-primary/40 mb-md">
                        <span className="material-symbols-outlined text-4xl">group_off</span>
                      </div>
                      <h3 className="font-h3 text-h3 text-on-surface mb-xs">No Tenants Yet</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-[500px] mx-auto text-center mt-sm">
                        You don't have any active or pending tenants at the moment. Once you publish a property and accept an application, your tenants will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-md border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center gap-md text-body-sm text-on-surface-variant">
            <span>Showing 0 of 0 tenants</span>
            <div className="flex gap-sm">
              <button className="px-sm py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-sm py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

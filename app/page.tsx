"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopNavBar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto transition-all duration-300 ${
          isScrolled
            ? "shadow-md bg-white/95 backdrop-blur-md dark:bg-on-surface/95"
            : "bg-surface-container-lowest dark:bg-on-surface"
        }`}
      >
        <div className="flex items-center gap-sm">
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
            className="text-primary font-bold border-b-2 border-primary font-label-md text-label-md transition-colors duration-150"
            href="/"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
          >
            Sign In
          </Link>
        </div>
        <div className="md:hidden">
          <span className="material-symbols-outlined text-primary text-[32px]">
            menu
          </span>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[870px] flex items-center overflow-hidden w-full max-w-max-width mx-auto">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxGt0-WnOxPkBwnse2v_iCBoK7nejQ2k2JkkYO5I23BnOWW0tey0ICvusjoVAdiDcNmOeHUcWcejEBHK-G6-CEu7oEfQhSXDu_QM7n15naV1DIbcACLAHR4A-9eSWkuBl3ojymoL-gmg5fa1VxXYCC9XQT7fuILVG6pchraSqH0s8rVDrxxztZ-AYEnIo0LxzwHjm8NjMAHQ3A9C5NdvzE5-w7vyLZDhusabEgMV8WSn7EW2p6yAceOOuosBekhwk81DJRrZ0')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-on-surface/80 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-max-width mx-auto px-lg md:px-2xl">
            <div className="max-w-[672px] text-on-primary-container">
              <h1 className="font-h1 text-h1 md:text-[56px] leading-[1.1] mb-md text-surface-container-lowest">
                Find your perfect home in Kigali with confidence.
              </h1>
              <p className="font-body-lg text-body-lg mb-xl text-surface-container-high opacity-90">
                The most trusted marketplace for verified housing, apartments, and rooms in Rwanda's heart.
              </p>
              <div className="flex flex-col sm:flex-row gap-md">
                <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-2xl py-md rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Searching
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-sm font-label-md text-label-md px-2xl py-md rounded-xl transition-all">
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Pillars */}
        <section className="py-3xl bg-surface-container-low">
          <div className="max-w-max-width mx-auto px-lg md:px-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              {/* Pillar 1 */}
              <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary transition-colors">
                  <span
                    className="material-symbols-outlined text-primary group-hover:text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
                <h3 className="font-h3 text-h3 mb-sm text-on-surface">
                  Verified Listings
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Every property and landlord is manually verified by our team to
                  ensure the highest security standards.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white">
                    videocam
                  </span>
                </div>
                <h3 className="font-h3 text-h3 mb-sm text-on-surface">
                  Video Tours
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Walk through your next home virtually before you even visit, saving
                  you time and travel costs.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white">
                    chat_bubble
                  </span>
                </div>
                <h3 className="font-h3 text-h3 mb-sm text-on-surface">
                  Secure Messaging
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Communicate safely with landlords through our encrypted platform,
                  keeping your data private.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Neighborhoods */}
        <section className="py-3xl">
          <div className="max-w-max-width mx-auto px-lg md:px-2xl">
            <div className="flex justify-between items-end mb-xl">
              <div>
                <h2 className="font-h2 text-h2 text-on-surface">
                  Featured Neighborhoods
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                  Explore the most sought-after residential zones in Kigali.
                </p>
              </div>
              <Link
                className="hidden md:flex items-center gap-xs text-primary font-label-md text-label-md hover:underline"
                href="#"
              >
                View all zones{" "}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
              {/* Zone Card 1 */}
              <div className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOC--EKCKZCzcJjfBWAnYecqC_iOrhG-SaS0YBpS-WX7udh4UBDFrK71pJdfEFRPt6cnn3LHiUF-BoqiXI3Y0t-X5Pi_qMd-kS0N3ybRJtWxxfu9aR8ay9E3rcyI9A6WdcoyY3IJu1yBduqt8zOedD2nlS_Np1jjOFn6j9bt7dQhiroRnw4xmYI4Nh4afNXx9YKPH76tWsgLJIEzwenl1LxVoxf8X5y_pNuE6P9CSZ3MYZg6diSiA8cUV2T1O3VagqoYszCCA')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-lg w-full">
                  <h4 className="font-h3 text-h3 text-white">Kiyovu</h4>
                  <p className="font-body-sm text-body-sm text-surface-container-highest">
                    Upscale &amp; Serene
                  </p>
                </div>
              </div>

              {/* Zone Card 2 */}
              <div className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMrmrs82i6z9LGScyuXu3EoegSw3QLxkbEcwLF8Tuk8oz2AbxwwPr4gfpgZo3GHXK6Kd3aPO3qA5b-W9-_IEMkaQdBDO6QVrgelZzTxAkuFlfV_Qm1Ivb-WyMTaBtgB_haYcFYpWlXvA1faK2RXFAyxZvNXMnPQoJkFqzNmEmOyeWIIeZZBuGz5NS1jJxd1Kz7FUQi6haJ0LI4LOf3UmeYZoxTZhXarIEjcp-8h_DMPgQ0h0ugxzowq8AMBRTPz810riTJAzo')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-lg w-full">
                  <h4 className="font-h3 text-h3 text-white">Kimironko</h4>
                  <p className="font-body-sm text-body-sm text-surface-container-highest">
                    Vibrant &amp; Connected
                  </p>
                </div>
              </div>

              {/* Zone Card 3 */}
              <div className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2eTbZP7WtDjKeAGeKqnJ2je16NwjxmsG0lQyCh2_jylxSDdRKGHxuXSv_gi0CQe5jf-ga9w1FHf1Die9nhPplOY7gbLEeYE--m10qMqZkGqkCH07MFNmGcwEiWV5alO20-0hDlXsFgY89v6IZ4F2IwoEmKPeccJWfwfgKdgkEpi-dTu16HbiqHV5k2H14m6pPjP8HG4DUwB8b7r1eV6GYQItArWZbqdMVCHWCVNj1sICxD3QTmY6EPS8wn7A3E5PsyLCU8fM')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-lg w-full">
                  <h4 className="font-h3 text-h3 text-white">Kacyiru</h4>
                  <p className="font-body-sm text-body-sm text-surface-container-highest">
                    Diplomatic Hub
                  </p>
                </div>
              </div>

              {/* Zone Card 4 */}
              <div className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXO5DMUTIZ928aOQV91xuxfTcohOb1HXi2nh9G431Zey9qehpGc1PdQr31OaiqphNsZLUbFA4OaJNGxDKPK9CEH9VZvVN-X3rRAWC1jZRtJNOzqE2tmCHESddMCsksr88lsmcJ0Fc4VnY0zfLNfLjcHsh6n1F1U3xD6at8z7i6IbPcR8UwumLJxaeUt1CvXZzOQRcmHxRMvYyJhHE9DQwagXWwgtsQ2l23P0qp9Ovf0W-qh7QTtRAjTev3KKyZqAiTtRylzBM')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-lg w-full">
                  <h4 className="font-h3 text-h3 text-white">Nyarutarama</h4>
                  <p className="font-body-sm text-body-sm text-surface-container-highest">
                    Luxury Living
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-3xl bg-surface-container-highest/30">
          <div className="max-w-max-width mx-auto px-lg md:px-2xl">
            <div className="text-center mb-2xl">
              <h2 className="font-h2 text-h2 text-on-surface">
                Experience the Seamless Journey
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[576px] mx-auto mt-sm">
                Whether you're looking for a home or renting out your property, we've
                simplified every step.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
              {/* For Renters */}
              <div className="space-y-lg">
                <div className="flex items-center gap-md mb-md">
                  <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center font-label-md">
                    1
                  </span>
                  <h3 className="font-h3 text-h3">For Renters</h3>
                </div>
                <div className="flex gap-lg">
                  <div className="w-1 border-r-2 border-dashed border-primary/30" />
                  <div className="space-y-xl">
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-primary">
                          search
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Search
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Filter by location, price, and amenities in our verified
                          catalog.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-primary">
                          calendar_month
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Schedule
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Book a physical visit or take a high-def virtual video
                          tour.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          key
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Move In
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Sign secure contracts and get the keys to your new Kigali
                          home.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Landlords */}
              <div className="space-y-lg">
                <div className="flex items-center gap-md mb-md">
                  <span className="bg-tertiary text-on-tertiary w-8 h-8 rounded-full flex items-center justify-center font-label-md">
                    2
                  </span>
                  <h3 className="font-h3 text-h3">For Landlords</h3>
                </div>
                <div className="flex gap-lg">
                  <div className="w-1 border-r-2 border-dashed border-tertiary/30" />
                  <div className="space-y-xl">
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-tertiary">
                          how_to_reg
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Verify
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Complete our vetting process to earn the 'Verified' trust
                          badge.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-tertiary">
                          add_business
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          List
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Upload photos and details. Our team can help with video
                          tours.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-outline-variant flex items-center justify-center shadow-sm">
                        <span
                          className="material-symbols-outlined text-tertiary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          handshake
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Rent
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Connect with pre-vetted tenants and manage your lease
                          efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-3xl">
          <div className="max-w-max-width mx-auto px-lg md:px-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              {/* Testimonial 1 */}
              <div className="bg-surface-container p-2xl rounded-2xl relative overflow-hidden">
                <span className="material-symbols-outlined absolute top-4 right-4 text-on-surface/10 text-[80px]">
                  format_quote
                </span>
                <p className="font-body-lg text-body-lg text-on-surface relative z-10 mb-xl italic">
                  "Moving to a new country was daunting, but Rent Connect made finding
                  a safe, verified apartment in Kimironko so simple. The video tour was
                  exactly what I saw in person!"
                </p>
                <div className="flex items-center gap-md">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-primary bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATYdhU0_W_UGTDiRhg8IKor2p-Vn2tkOv3vfdr5N3OdWlVBjl9iFZoQEmZmKiI4MQI9pYCdBRza2d1b7mbkroNDgU28W9J1AhNsNxtIfLZ4T3FvkI2QO5OUm_S4nNbhcH1Bmwd7hy7v2OjO0xgnw9u_6T0oQ4iUFcIHgNo0Tx86FY1s7K1zy5ePEc0nPIaMXYvkqhaXQftmHkVeUBUXjrlxNdT1GSQzJ3IrhMUZh5mWx43HFHyuFwWgsqbpMMNGd4ZMT_CI6k')",
                    }}
                  />
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      Elena Rodriguez
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      International Student
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-surface-container p-2xl rounded-2xl relative overflow-hidden">
                <span className="material-symbols-outlined absolute top-4 right-4 text-on-surface/10 text-[80px]">
                  format_quote
                </span>
                <p className="font-body-lg text-body-lg text-on-surface relative z-10 mb-xl italic">
                  "As a local professional, I value trust above all. Rent Connect's
                  verification process ensures I'm dealing with legitimate landlords,
                  making my search for a home in Kacyiru stress-free."
                </p>
                <div className="flex items-center gap-md">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-primary bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOg28iw-mjMo4gvN2EOc7x4Immf6PopL-thfManWuxXIZbvuF4Af6MuJrFszb48bLEAEAqi3EzWoIkTuB3N-tiTssvyd4-QwubvQbA4xaZHmIX6hFXItoUPGFixUSQPZWTeAJJckP75heBLpe5Tm_cnS_ZEfChokfCx0gU7ItAk_SBYkB13fXOwbtpQTbPvAdFLnpfDz2oWOCbIoecI9vtVDUWZonwQVAXjacgGDVuTGhnQUUaYm5wfkpxjJSIrL9gccM1fcw')",
                    }}
                  />
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      Jean-Paul Mutara
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Financial Analyst
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-3xl relative overflow-hidden">
          <div className="max-w-max-width mx-auto px-lg md:px-2xl relative z-10">
            <div className="bg-on-surface rounded-3xl p-2xl md:p-3xl text-center shadow-2xl">
              <h2 className="font-h1 text-h1 text-white mb-md">
                Ready to find your new home?
              </h2>
              <p className="font-body-lg text-body-lg text-surface-variant mb-xl max-w-[672px] mx-auto opacity-80">
                Join thousands of happy residents who found their dream property
                through Rwanda's most trusted marketplace.
              </p>
              <Link href="/signup" className="inline-block bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-3xl py-md rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </Link>
              <div className="mt-xl flex justify-center flex-wrap gap-xl text-surface-container-highest/40">
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    verified
                  </span>{" "}
                  Verified
                </div>
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    support_agent
                  </span>{" "}
                  24/7 Support
                </div>
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    security
                  </span>{" "}
                  Secure
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-low dark:bg-on-surface border-t border-outline-variant mt-auto">
        <div className="flex flex-col gap-sm items-center md:items-start">
          <div className="text-label-md font-label-md text-primary">
            Rent Connect Kigali
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">
            © 2026 Rent Connect Kigali. Premier Housing Marketplace.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-lg">
          <Link
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary font-label-sm text-label-sm transition-colors"
            href="#"
          >
            About Us
          </Link>
          <Link
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary font-label-sm text-label-sm transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary font-label-sm text-label-sm transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary font-label-sm text-label-sm transition-colors"
            href="#"
          >
            Help Center
          </Link>
          <Link
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary font-label-sm text-label-sm transition-colors"
            href="#"
          >
            Contact Support
          </Link>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();
  const [role, setRole] = useState("renter");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role,
        }
      }
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-md md:p-xl relative">
      {/* Subtle Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Signup Container */}
      <main className="relative z-10 w-full max-w-[520px]">
        {/* Brand Header */}
        <header className="text-center mb-xl">
          <div className="inline-flex items-center gap-sm mb-md">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              domain
            </span>
            <span className="font-h3 text-h3 text-primary tracking-tight">
              Rent Connect
            </span>
          </div>
          <h1 className="font-h2 text-h2 text-on-background mb-xs">
            Create your account
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Join Kigali's premier housing marketplace
          </p>
        </header>

        {/* Focused Signup Card */}
        <section className="bg-white/95 backdrop-blur-md border border-outline-variant rounded-xl shadow-sm p-lg md:p-xl">
          {errorMsg && (
            <div className="mb-md p-md bg-error-container text-on-error-container rounded-xl font-body-sm">
              {errorMsg}
            </div>
          )}
          <form className="space-y-lg" onSubmit={handleSignup}>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-md">
              <label className="cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="renter"
                  className="hidden peer"
                  checked={role === "renter"}
                  onChange={() => setRole("renter")}
                />
                <div className="border border-outline-variant rounded-lg p-md text-center transition-all group-hover:border-primary group-hover:bg-surface-container-low peer-checked:border-primary peer-checked:bg-[#f4fffc]">
                  <span
                    className="material-symbols-outlined text-on-surface-variant block mb-xs transition-all"
                    style={{
                      fontVariationSettings: role === "renter" ? "'FILL' 1" : "'FILL' 0",
                      color: role === "renter" ? "var(--color-primary)" : "",
                    }}
                  >
                    person
                  </span>
                  <span className="font-label-md text-label-md block">
                    I'm a Renter
                  </span>
                </div>
              </label>

              <label className="cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="landlord"
                  className="hidden peer"
                  checked={role === "landlord"}
                  onChange={() => setRole("landlord")}
                />
                <div className="border border-outline-variant rounded-lg p-md text-center transition-all group-hover:border-primary group-hover:bg-surface-container-low peer-checked:border-primary peer-checked:bg-[#f4fffc]">
                  <span
                    className="material-symbols-outlined text-on-surface-variant block mb-xs transition-all"
                    style={{
                      fontVariationSettings: role === "landlord" ? "'FILL' 1" : "'FILL' 0",
                      color: role === "landlord" ? "var(--color-primary)" : "",
                    }}
                  >
                    real_estate_agent
                  </span>
                  <span className="font-label-md text-label-md block">
                    I'm a Landlord
                  </span>
                </div>
              </label>
            </div>

            {/* Input Fields Cluster */}
            <div className="space-y-md">
              {/* Full Name */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-xs"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    badge
                  </span>
                  <input
                    className="w-full pl-xl pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md form-input-focus"
                    id="name"
                    placeholder="John Doe"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-xs"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    mail
                  </span>
                  <input
                    className="w-full pl-xl pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md form-input-focus"
                    id="email"
                    placeholder="john@example.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-xs"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="flex gap-sm">
                  <div className="flex items-center px-md py-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface-variant">
                    <span className="mr-xs">🇷🇼</span> +250
                  </div>
                  <div className="relative flex-grow">
                    <input
                      className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md form-input-focus"
                      id="phone"
                      placeholder="78X XXX XXX"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-xs"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    lock
                  </span>
                  <input
                    className="w-full pl-xl pr-[48px] py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md form-input-focus"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {password.length > 0 && password.length < 8 && (
                  <p className="mt-xs font-label-sm text-label-sm text-error flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      info
                    </span>
                    Password must be at least 8 characters long.
                  </p>
                )}
              </div>
            </div>

            {/* Trust Element / Info Box */}
            <div className="bg-surface-container-low p-md rounded-lg flex gap-sm items-start border-l-4 border-primary">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Your data is protected according to Rwandan data protection laws. We
                value your privacy.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-md pt-sm">
              <button
                className="w-full py-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-xl transition-all shadow-sm active:scale-[0.98] flex justify-center items-center gap-sm"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Redirecting...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="relative flex items-center py-sm">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-md font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  or
                </span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              <button
                className="w-full py-md bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl transition-all flex items-center justify-center gap-md"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 1.2-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                Sign up with Google
              </button>
            </div>

            {/* Login Redirect */}
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link
                className="text-primary font-label-md hover:underline decoration-2 underline-offset-4"
                href="/login"
              >
                Log in
              </Link>
            </p>
          </form>
        </section>

        {/* Footer Links */}
        <footer className="mt-xl py-lg text-center">
          <div className="flex justify-center gap-lg mb-md">
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <span className="text-outline-variant text-[8px]">•</span>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <span className="text-outline-variant text-[8px]">•</span>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Help Center
            </Link>
          </div>
          <p className="font-label-sm text-label-sm text-outline">
            © 2026 Rent Connect Kigali. Premier Housing Marketplace.
          </p>
        </footer>
      </main>
    </div>
  );
}

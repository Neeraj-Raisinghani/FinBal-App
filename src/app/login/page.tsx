"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ASSETS_BASE_URL } from "@/lib/assets";

const PANEL_IMAGES = [
  "usecase-desk-laptops.jpg",
  "usecase-laptop-meeting.jpg",
  "usecase-laptop-phone-cafe.jpg",
  "usecase-phone-checkout.jpg",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "var(--space-2) var(--space-3) var(--space-2) 2.75rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg)",
  fontSize: "var(--text-base)",
  lineHeight: "var(--lh-tight)",
  color: "var(--color-primary)",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  height: "2.75rem",
};

function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
  e.target.style.borderColor = "var(--green)";
  e.target.style.boxShadow = "0 0 0 3px var(--green-bg)";
}

function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow = "none";
}

function FloatingLabel({ text, floated }: { text: string; floated: boolean }) {
  return (
    <span
      style={{
        position: "absolute",
        left: "2.75rem",
        top: floated ? 0 : "50%",
        transform: floated ? "translateY(-50%)" : "translateY(-50%)",
        padding: floated ? "0 4px" : 0,
        background: floated ? "var(--bg)" : "transparent",
        fontSize: floated ? "var(--text-xs)" : "var(--text-base)",
        color: floated ? "var(--green)" : "var(--subtle)",
        fontFamily: "var(--font-body)",
        pointerEvents: "none",
        transition: "top 0.18s cubic-bezier(0.22,1,0.36,1), font-size 0.18s cubic-bezier(0.22,1,0.36,1), color 0.18s ease",
      }}
    >
      {text}
    </span>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % PANEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up authClient.signIn.email({ email, password }) once Better Auth + Turso are connected.
    setSubmitting(true);
    setError(null);
    setTimeout(() => {
      setSubmitting(false);
      setError("Account not found.");
    }, 600);
  }

  return (
    <div className="grid flex-1 md:grid-cols-[60%_40%]">
      {/* Left: full-bleed image, cross-fading between a few shots */}
      <div className="relative hidden min-h-screen overflow-hidden md:block">
        {PANEL_IMAGES.map((file, i) => (
          <Image
            key={file}
            src={`${ASSETS_BASE_URL}/${file}`}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 0px"
            style={{ objectFit: "cover", opacity: i === imageIndex ? 1 : 0, transition: "opacity 1.2s ease-in-out" }}
            priority={i === 0}
          />
        ))}

        <div
          className="absolute inset-x-0 flex items-center justify-center"
          style={{ bottom: "var(--space-6)", gap: "var(--space-2)" }}
        >
          {PANEL_IMAGES.map((file, i) => (
            <button
              key={file}
              type="button"
              onClick={() => setImageIndex(i)}
              aria-label={`Show image ${i + 1}`}
              style={{
                width: i === imageIndex ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                background: i === imageIndex ? "var(--color-primary)" : "var(--border-md)",
                transition: "width 0.25s ease, background-color 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-col justify-center" style={{ padding: "var(--space-7)", background: "var(--bg)" }}>
        <div className="mx-auto w-full" style={{ maxWidth: "var(--measure-sm)" }}>
          <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
            <div style={{ backgroundColor: "var(--green)" }} className="flex h-8 w-8 items-center justify-center rounded-lg">
              <svg width="16" height="19" viewBox="0 0 27 32" fill="none">
                <path
                  d="M9.696 30.8396C11.68 31.6132 13.856 32 16.224 32C17.792 32 19.36 31.8215 20.928 31.4644C22.496 31.0776 23.92 30.5569 25.2 29.9024C26.4299 29.2734 26.1964 27.4929 25.0295 26.7537C22.4568 25.1238 19.1311 21.885 19.1311 16.0318C19.1311 9.88121 22.7027 6.78139 25.2432 5.35448C26.3188 4.75035 26.6769 3.24435 25.632 2.58856C24.384 1.75546 22.976 1.11576 21.408 0.669455C19.872 0.223152 18.288 0 16.656 0C14.32 0 12.144 0.401673 10.128 1.20502C8.112 2.00837 6.352 3.139 4.848 4.59693C3.344 6.05486 2.16 7.75081 1.296 9.6848C0.432 11.589 0 13.6718 0 15.9331C0 18.2836 0.4 20.4407 1.2 22.4045C2 24.3682 3.12 26.079 4.56 27.537C6.032 28.9651 7.744 30.066 9.696 30.8396Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-bold)",
                color: "var(--color-primary)",
                letterSpacing: "var(--letter-lg)",
              }}
            >
              FinBal
            </span>
          </div>

          <h1 style={{ marginBottom: "var(--space-1)" }}>Log in</h1>
          <p className="section-label" style={{ marginBottom: "var(--space-8)" }}>
            Portfolio data, up to date.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="relative">
              <MailIcon
                style={{ position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)", zIndex: 1 }}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => {
                  setEmailFocused(true);
                  handleFocus(e);
                }}
                onBlur={(e) => {
                  setEmailFocused(false);
                  handleBlur(e);
                }}
                style={inputStyle}
              />
              <FloatingLabel text="Email address" floated={emailFocused || email.length > 0} />
            </div>

            <div>
              <div className="relative">
                <LockIcon
                  style={{ position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)", zIndex: 1 }}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => {
                    setPasswordFocused(true);
                    handleFocus(e);
                  }}
                  onBlur={(e) => {
                    setPasswordFocused(false);
                    handleBlur(e);
                  }}
                  style={{ ...inputStyle, paddingRight: "2.75rem" }}
                />
                <FloatingLabel text="Password" floated={passwordFocused || password.length > 0} />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ position: "absolute", right: "var(--space-3)", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)" }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <div className="flex justify-end" style={{ marginTop: "var(--space-1)" }}>
                <a href="/forgot-password" className="rt-link-fade" style={{ fontSize: "var(--text-sm)" }}>
                  Forgot password?
                </a>
              </div>
            </div>

            {error && (
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--red-error)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {error} Please{" "}
                <a
                  href="https://finbal.neerajraisinghani.com/contact"
                  style={{ color: "var(--red-error)", textDecoration: "underline" }}
                >
                  contact
                </a>{" "}
                for assistance.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="rt-btn"
              style={{ marginTop: "var(--space-2)", width: "100%" }}
            >
              <div className="rt-btn-inner" style={{ justifyContent: "center", width: "100%" }}>
                <div className="rt-btn-text-wrap">
                  <span className="rt-btn-t1">{submitting ? "Logging in…" : "Log in"}</span>
                  <span className="rt-btn-t2">{submitting ? "Logging in…" : "Log in"}</span>
                </div>
                <div className="rt-btn-arrow-wrap">
                  <div className="rt-btn-a1">
                    <ArrowRight size={14} />
                  </div>
                  <div className="rt-btn-a2">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MailIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={style}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={style}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M6.6 6.8C3.9 8.3 2 12 2 12s4 7 11 7a10.4 10.4 0 0 0 5.4-1.5M17.4 17.3C20.1 15.7 22 12 22 12s-4-7-11-7a10.4 10.4 0 0 0-2.3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

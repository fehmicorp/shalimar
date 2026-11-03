
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Connect your password-reset API here.
      // Example: POST /api/auth/reset

      setError("Password reset service is not configured yet.");
    } catch {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center pt-10">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#b18a50]/30 bg-[#b18a50]/10">
          <ShieldCheck size={28} className="text-[#a47c43]" />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          Request Submitted
        </span>

        <h1 className="mt-4 font-serif text-4xl text-[#382b20]">
          Check Your <span className="italic text-[#b18a50]">Inbox.</span>
        </h1>

        <p className="mt-5 text-sm leading-7 text-[#817361]">
          If an account exists for this email address, password reset
          instructions will be sent to you.
        </p>

        <Link
          href="/login"
          className="mt-9 inline-flex h-14 w-full items-center justify-center gap-3 bg-[#382b20] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43]"
        >
          <ArrowLeft size={16} />
          Back To Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          Account Recovery
        </span>

        <h1 className="font-serif text-4xl font-normal tracking-tight text-[#382b20] sm:text-5xl">
          Reset <span className="italic text-[#b18a50]">Password.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[320px] text-sm leading-7 text-[#817361]">
          Enter your registered email address to request a secure password
          reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]">
            Registered Email
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shalimar.org"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex h-14 w-full items-center justify-center gap-3 bg-[#382b20] px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Request Reset Link"}

          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      <div className="mt-9 border-t border-[#e4dacb] pt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#a47c43] transition hover:text-[#382b20]"
        >
          <ArrowLeft size={14} />
          Return To Login
        </Link>
      </div>
    </div>
  );
}

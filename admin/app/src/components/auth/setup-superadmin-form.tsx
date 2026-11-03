
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  ShieldCheck,
} from "lucide-react";

export default function SetupSuperAdminForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/auth/sadm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to create Super Admin.");
      }

      // Root session is destroyed by the API.
      window.location.assign("/login?setup=complete");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete Super Admin setup."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-8">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#382b20] text-[#d8b77f]">
          <ShieldCheck size={26} />
        </div>

        <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          First-Time Configuration
        </span>

        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#382b20] sm:text-4xl">
          Create Super Admin
          <span className="italic text-[#b18a50]"> Account.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[340px] text-sm leading-7 text-[#817361]">
          Create the permanent administrator account. Once completed,
          bootstrap root access will be disabled.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="superadmin-username"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Super Admin Username
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="superadmin-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              minLength={3}
              maxLength={50}
              pattern="[a-zA-Z0-9._-]+"
              required
              placeholder="Enter username"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="superadmin-password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="superadmin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={12}
              maxLength={128}
              required
              placeholder="Create a strong password"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-12 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="superadmin-confirm-password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Confirm Password
          </label>

          <input
            id="superadmin-confirm-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            maxLength={128}
            required
            placeholder="Confirm your password"
            className="h-14 w-full border border-[#dfd5c5] bg-white/70 px-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
          />
        </div>

        <div className="border border-[#e8dfd1] bg-[#faf8f3] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f5c47]">
            Password requirements
          </p>

          <ul className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-[#817361]">
            <li>• Minimum 12 characters</li>
            <li>• Uppercase letter</li>
            <li>• Lowercase letter</li>
            <li>• Number</li>
            <li>• Special character</li>
          </ul>
        </div>

        {error && (
          <p
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex h-14 w-full items-center justify-center gap-3 bg-[#382b20] px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Super Admin"}
          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-[#e4dacb] pt-5 text-center">
        <p className="text-[10px] leading-6 text-[#817361]">
          This is a one-time security setup.
          <br />
          Bootstrap root access will be permanently disabled after creation.
        </p>
      </div>
    </div>
  );
}

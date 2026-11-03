"use client";

import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function RecoverSuperAdminForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordIsValid =
    password.length >= 12 &&
    password.length <= 128 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
      setError("Enter the existing Super Admin username.");
      return;
    }

    if (!passwordIsValid) {
      setError(
        "Password must be 12–128 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/auth/redm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username: normalizedUsername,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to recover the Super Admin account."
        );
      }

      setSuccess(
        "Super Admin password has been changed. Root access has been disabled. Please sign in using the new Super Admin password."
      );

      setPassword("");
      setConfirmPassword("");

      // The recovery API expires the Root session.
      // Return to the normal login screen after showing confirmation.
      window.setTimeout(() => {
        window.location.assign("/login?recovered=1");
      }, 1800);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete password recovery."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-10">
      <div className="text-center">
        <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          <ShieldCheck size={14} />
          Root Recovery Access
        </span>

        <h1 className="font-serif text-4xl font-normal tracking-tight text-[#382b20] sm:text-5xl">
          Recover Super Admin
          <span className="mt-1 block italic text-[#b18a50]">
            Account.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-[340px] text-sm leading-7 text-[#817361]">
          Set a new password for the existing Super Admin account. This
          operation does not create another account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="superadmin-username"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Existing Super Admin Username
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="superadmin-username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              required
              maxLength={50}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter existing Super Admin username"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={12}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a new password"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-12 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a47c43] transition hover:text-[#382b20]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <p className="mt-2 text-[10px] leading-5 text-[#a09280]">
            Minimum 12 characters, including uppercase, lowercase, number and
            special character.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Confirm New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              maxLength={128}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-12 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a47c43] transition hover:text-[#382b20]"
            >
              {showConfirmPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="border border-green-200 bg-green-50 px-4 py-3 text-xs leading-5 text-green-800"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || Boolean(success)}
          className="group flex h-14 w-full items-center justify-center gap-3 bg-[#382b20] px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating Password..." : "Reset Super Admin Password"}

          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <div className="mt-9 border-t border-[#e4dacb] pt-6 text-center">
        <p className="text-[11px] leading-6 text-[#817361]">
          Root recovery is restricted to the existing Root account.
          <br />
          Root access will be disabled automatically after recovery.
        </p>
      </div>
    </div>
  );
}
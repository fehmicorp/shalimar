
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";

interface SetPasswordFormProps {
  hashToken: string;
}

interface PasswordRule {
  label: string;
  valid: boolean;
}

export default function SetPasswordForm({
  hashToken,
}: SetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const tokenValid = /^[a-fA-F0-9]{64}$/.test(hashToken);
  const currentYear = new Date().getFullYear().toString();

  const weakPasswords = [
    "password",
    "password123",
    "admin",
    "admin123",
    "administrator",
    "welcome",
    "welcome123",
    "qwerty",
    "qwerty123",
    "letmein",
    "12345678",
    "123456789",
    "1234567890",
    "iloveyou",
    "changeme",
    "shalimar",
    "shalimar123",
  ];

  const rules = useMemo<PasswordRule[]>(() => {
    const normalized = password.toLowerCase();

    const isWeakPassword = weakPasswords.includes(normalized);

    const hasCommonPattern =
      /^(.)\1{5,}$/.test(password) ||
      /^(012345|123456|234567|345678|456789|987654|abcdef|qwerty)/i.test(
        password
      );

    return [
      { label: "Minimum 8 characters", valid: password.length >= 8 },
      { label: "First character uppercase", valid: /^[A-Z]/.test(password) },
      { label: "At least one number", valid: /\d/.test(password) },
      {
        label: "At least one special character",
        valid: /[^A-Za-z0-9]/.test(password),
      },
      {
        label: `Exclude ${currentYear}`,
        valid: !password.includes(currentYear),
      },
      {
        label: "Avoid common passwords",
        valid: !isWeakPassword && !hasCommonPattern,
      },
    ];
  }, [password, currentYear]);

  const passwordValid = rules.every((rule) => rule.valid);

  const confirmationValid =
    confirmPassword.length > 0 && password === confirmPassword;

  const canSubmit =
    tokenValid && passwordValid && confirmationValid && !loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!tokenValid) {
      setError("Invalid or malformed password reset link.");
      return;
    }

    if (!passwordValid) {
      setError("Please satisfy all password requirements.");
      return;
    }

    if (!confirmationValid) {
      setError("Password confirmation does not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/setpwd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashToken, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to set your password.");
      }

      setSubmitted(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Invalid token
  if (tokenValid) {
    return (
      <div className="flex min-h-[65svh] flex-col items-center justify-center text-center">
        <div className=" flex h-14 w-14 items-center justify-center rounded-full border border-red-200 bg-red-50">
          <X size={25} className="text-red-600" />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-600">
          Invalid Request
        </span>

        <h1 className="mt-3 font-serif text-3xl text-[#382b20]">
          Invalid <span className="italic text-[#b18a50]">Link.</span>
        </h1>

        <p className="mt-3 max-w-[300px] text-xs leading-6 text-[#817361]">
          This password setup link is invalid or incomplete.
          Please request a new link.
        </p>

        <Link
          href="/reset"
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 bg-[#382b20] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43]"
        >
          Request New Link <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  // Success
  if (submitted) {
    return (
      <div className="flex min-h-[65svh] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#b18a50]/30 bg-[#b18a50]/10">
          <ShieldCheck size={25} className="text-[#a47c43]" />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          Password Updated
        </span>

        <h1 className="mt-3 font-serif text-3xl text-[#382b20]">
          All <span className="italic text-[#b18a50]">Set.</span>
        </h1>

        <p className="mt-3 max-w-[300px] text-xs leading-6 text-[#817361]">
          Your password has been successfully updated.
          You can now sign in using your new credentials.
        </p>

        <Link
          href="/login"
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 bg-[#382b20] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43]"
        >
          Continue To Login <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="mb-2 inline-block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          Account Security
        </span>

        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#382b20] sm:text-4xl">
          Set Your <span className="italic text-[#b18a50]">Password.</span>
        </h1>

        <p className="mx-auto mt-2 max-w-[330px] text-xs leading-6 text-[#817361]">
          Create a strong password to secure your Shalimar
          administrative account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New password */}
        <div>
          <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]">
            New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="h-12 w-full border border-[#dfd5c5] bg-white/70 pl-11 pr-11 text-xs text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Password requirements */}
        <div className="border border-[#e4dacb] bg-white/50 px-4 py-3">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]">
            Password Requirements
          </p>

          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {rules.map((rule) => (
              <div key={rule.label} className="flex items-center gap-2">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    rule.valid
                      ? "bg-[#b18a50]/15 text-[#a47c43]"
                      : "bg-[#e9e2d8] text-[#a99b88]"
                  }`}
                >
                  {rule.valid ? <Check size={10} /> : <X size={10} />}
                </span>

                <span
                  className={`text-[10px] leading-4 ${
                    rule.valid ? "text-[#6c593f]" : "text-[#948574]"
                  }`}
                >
                  {rule.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]">
            Confirm Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="h-12 w-full border border-[#dfd5c5] bg-white/70 pl-11 pr-11 text-xs text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            >
              {showConfirmPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-1.5 text-[10px] ${
                confirmationValid ? "text-[#a47c43]" : "text-red-600"
              }`}
            >
              {confirmationValid
                ? "Passwords match."
                : "Passwords do not match."}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] text-red-700"
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="group flex h-12 w-full items-center justify-center gap-3 bg-[#382b20] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a47c43] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Updating Password..." : "Set New Password"}
          {!loading && (
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-5 border-t border-[#e4dacb] pt-4 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-[#a47c43] transition hover:text-[#382b20]"
        >
          <ArrowLeft size={13} />
          Back To Login
        </Link>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";

interface LoginFormProps {
  setSetupRequired: (value: boolean) => void;
  setRecoveryRequired: (value: boolean) => void;
}

export default function LoginForm({ setSetupRequired, setRecoveryRequired, }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password) {
      setError("Please enter your username and password.");
      return;
    }

    if (loading) return;

    if (
      normalizedUsername.length < 3 ||
      normalizedUsername.length > 51 ||
      password.length < 1 ||
      password.length > 128
    ) {
      setError("Invalid username or password. Please check your credentials.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username: normalizedUsername,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Invalid username or password."
        );
      }

      if (result.requiresSetup === true) {
        setSetupRequired(true);
        return;
      }

      if (result.requiresRecovery === true) {
        setRecoveryRequired(true);
        return;
      }

      window.location.assign("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10">
      <div className="text-center">
        <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
          Welcome Back
        </span>

        <h1 className="font-serif text-4xl font-normal tracking-tight text-[#382b20] sm:text-5xl">
          Management Console{" "}
          <span className="italic text-[#b18a50]">Sign In.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[300px] text-sm leading-7 text-[#817361]">
          Access your administrative workspace securely.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
          >
            Username
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              required
              minLength={3}
              maxLength={51}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or #rootadmin"
              className="h-14 w-full border border-[#dfd5c5] bg-white/70 pl-12 pr-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a795] focus:border-[#b18a50] focus:bg-white"
            />
          </div>

          <p className="mt-2 text-[10px] text-[#a09280]">
            Use # before the username to access the root account.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5c47]"
            >
              Password
            </label>

            <Link
              href="/reset"
              className="text-[11px] text-[#a47c43] transition hover:text-[#382b20]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
          {loading ? "Signing In..." : "Sign In To Dashboard"}

          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      <div className="mt-9 border-t border-[#e4dacb] pt-6 text-center">
        <p className="text-[11px] leading-6 text-[#817361]">
          This portal is restricted to authorized users.
          <br />
          All access attempts may be monitored.
        </p>
      </div>
    </div>
  );
}

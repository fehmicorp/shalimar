"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/login-form";
import SetupSuperAdminForm from "@/components/auth/setup-superadmin-form";
import RecoverSuperAdminForm from "@/components/auth/recover-superadmin-form";

type AuthScreen = "login" | "setup" | "recovery";

export default function LoginFlow() {
  const [screen, setScreen] = useState<AuthScreen>("login");

  if (screen === "setup") {
    return <SetupSuperAdminForm />;
  }

  if (screen === "recovery") {
    return <RecoverSuperAdminForm />;
  }

  return (
    <LoginForm
      setSetupRequired={(value) => {
        if (value) setScreen("setup");
      }}
      setRecoveryRequired={(value) => {
        if (value) setScreen("recovery");
      }}
    />
  );
}
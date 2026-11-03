import { InitializeServer } from "@/lib/server/initialize";

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  console.info("[Startup] Initializing Shalimar Admin Server...");

  await InitializeServer();

  console.info("[Startup] Shalimar Admin Server is ready.");
}
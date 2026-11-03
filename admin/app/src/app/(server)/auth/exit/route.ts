
import { NextResponse } from "next/server";

import { destroyAdminSession } from "@/lib/server/auth";
import { InitializeServer } from "@/lib/server/initialize";

// export const runtime = "nodejs";

export async function POST() {
  try {
    await InitializeServer();
    await destroyAdminSession();

    return NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("[Admin Auth] Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to complete logout.",
      },
      { status: 503 }
    );
  }
}

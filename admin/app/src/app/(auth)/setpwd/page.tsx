import SetPasswordForm from "@/components/auth/set-password-form";

export const metadata = {
  title: "Set Password | Shalimar Admin",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{
    hashToken?: string;
  }>;
}

export default async function SetPasswordPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  return <SetPasswordForm hashToken={params.hashToken ?? ""} />;
}
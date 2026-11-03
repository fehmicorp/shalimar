import AuthLayout from "@/components/auth/auth-layout";

export default function AuthAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
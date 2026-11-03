import ResetForm from "@/components/auth/reset-form";

export const metadata = {
  title: "Reset Password | Shalimar",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPage() {
  return <ResetForm />;
}
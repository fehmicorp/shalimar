import LoginFlow from "@/components/auth/login-flow";

export const metadata = {
  title: "Admin Login | Shalimar",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginFlow />;
}
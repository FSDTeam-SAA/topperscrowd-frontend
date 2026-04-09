import { Suspense } from "react";
import VerifyEmailForm from "@/features/auth/components/VerifyEmailForm";

export const metadata = {
  title: "Verify Email | Thorian",
  description: "Verify your email address",
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailForm />
    </Suspense>
  );
}

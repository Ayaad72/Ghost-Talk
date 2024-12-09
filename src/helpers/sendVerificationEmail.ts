import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend";
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const resend = new Resend("re_123456789");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Ghost Talk  | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Verification Email sent successfully",
    };
  } catch (emailError) {
    console.error("Error Sendng verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}

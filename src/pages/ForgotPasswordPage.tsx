import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppLogo from "../components/AppLogo";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/ui/Buttons";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>();

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <AppLogo />
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">
          Forgot Password?
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter your mobile number and we&apos;ll send a verification code.
        </p>

        {sent ? (
          <div className="glass mt-8 p-6 text-center">
            <p className="font-bold text-success">Verification code sent!</p>
            <p className="mt-1 text-sm text-muted">
              Check your SMS messages to reset your password.
            </p>
            <Link to="/login" className="mt-4 inline-block font-bold text-teal">
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(() => setSent(true))}
            className="mt-8 flex flex-col gap-4"
            noValidate
          >
            <InputField
              id="phone"
              label="Mobile Number"
              placeholder="09 777 888 999"
              error={errors.phone?.message}
              {...register("phone", { required: "Mobile number is required" })}
            />
            <PrimaryButton type="submit" className="w-full">
              Send Verification Code
            </PrimaryButton>
            <Link
              to="/login"
              className="text-center text-sm font-semibold text-teal"
            >
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppLogo from "../components/AppLogo";
import { InputField, PasswordInput } from "../components/InputField";
import { PrimaryButton } from "../components/ui/Buttons";

interface Form {
  name: string;
  phone: string;
  password: string;
  confirm: string;
  terms: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();
  const password = watch("password");

  const onSubmit = () => navigate("/verify-code");

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <AppLogo />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-muted">
          Join M STUDIO Hub to earn and redeem rewards.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-4"
          noValidate
        >
          <InputField
            id="name"
            label="Full Name"
            placeholder="Rachel"
            error={errors.name?.message}
            {...register("name", { required: "Full name is required" })}
          />
          <InputField
            id="phone"
            label="Mobile Number"
            placeholder="09 777 888 999"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Mobile number is required",
              minLength: { value: 6, message: "Enter a valid number" },
            })}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "At least 4 characters" },
            })}
          />
          <PasswordInput
            id="confirm"
            label="Confirm Password"
            placeholder="••••••••"
            error={errors.confirm?.message}
            {...register("confirm", {
              required: "Please confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            })}
          />
          <label className="flex items-start gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-teal"
              {...register("terms", {
                required: "You must accept the Terms and Conditions",
              })}
            />
            <span>
              I agree to the Terms &amp; Conditions and Privacy Policy
            </span>
          </label>
          {errors.terms && (
            <p className="-mt-2 text-xs font-semibold text-danger">
              {errors.terms.message}
            </p>
          )}
          <PrimaryButton type="submit" className="w-full">
            Sign Up
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-teal">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

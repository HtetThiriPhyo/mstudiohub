import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppLogo from "../components/AppLogo";
import { InputField, PasswordInput } from "../components/InputField";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { useAppStore } from "../store/useAppStore";

interface Form {
  phone: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const toast = useAppStore((s) => s.toast);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();

  const onSubmit = () => {
    login();
    toast("Welcome back!");
    navigate("/home");
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <AppLogo />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-teal">
          Everything Apple is here
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Welcome Back.
        </h1>
        <h2 className="text-4xl font-extrabold tracking-tight text-teal">
          Let&apos;s Explore.
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-4"
          noValidate
        >
          <InputField
            id="phone"
            label="Mobile Number"
            placeholder="09 777 888 999"
            inputMode="tel"
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
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-teal"
            >
              Forgot Password?
            </Link>
          </div>
          <PrimaryButton type="submit" className="w-full">
            Log In
          </PrimaryButton>
          <SecondaryButton
            type="button"
            className="w-full"
            onClick={() => {
              setValue("phone", "09777888999");
              setValue("password", "mstudio123");
              login();
              toast("Logged in as demo user");
              navigate("/home");
            }}
          >
            Demo Login
          </SecondaryButton>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-navy/10" /> Or continue with{" "}
          <div className="h-px flex-1 bg-navy/10" />
        </div>
        <Link to="/register" className="block">
          <SecondaryButton className="w-full">Register</SecondaryButton>
        </Link>
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-teal">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-center text-xs text-muted">
          Demo account: 09777888999 / mstudio123
        </p>
      </div>
    </div>
  );
}

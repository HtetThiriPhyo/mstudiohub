import { useForm } from "react-hook-form";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/ui/Buttons";
import { useAppStore } from "../store/useAppStore";

export default function ManageProfilePage() {
  const user = useAppStore((s) => s.user);
  const updateUser = useAppStore((s) => s.updateUser);
  const toast = useAppStore((s) => s.toast);
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user.name, phone: user.phone, email: user.email },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        Manage Profile
      </h1>
      <div className="glass p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-xl font-bold text-teal">
            {user.name.charAt(0)}
          </div>
          <button
            className="rounded-full border border-navy/10 px-4 py-2 text-sm font-semibold"
            onClick={() => toast("Photo picker is a mock action", "info")}
          >
            Change photo
          </button>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((v) => {
            updateUser(v);
            toast("Profile updated");
          })}
        >
          <InputField
            id="name"
            label="Name"
            {...register("name", { required: true })}
          />
          <InputField id="phone" label="Mobile Number" {...register("phone")} />
          <InputField
            id="email"
            label="Email"
            type="email"
            {...register("email")}
          />
          <PrimaryButton type="submit">Save Changes</PrimaryButton>
        </form>
      </div>
    </div>
  );
}

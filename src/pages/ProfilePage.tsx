import { Link } from "react-router-dom";
import {
  Shield,
  User,
  Info,
  MapPin,
  Wrench,
  Languages,
  FileText,
} from "lucide-react";
import ProfileMenuRow from "../components/ProfileMenuRow";
import { useAppStore } from "../store/useAppStore";

const groups = [
  {
    title: "Account",
    items: [
      {
        icon: User,
        label: "Manage Profile",
        description: "Name, email, mobile",
        to: "/profile/manage",
      },
      {
        icon: Shield,
        label: "Security & Privacy",
        description: "Password, biometrics, notifications",
        to: "/profile/security",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: Info,
        label: "About CEIR",
        description: "App info & version",
        to: "/profile/about-ceir",
      },
      {
        icon: MapPin,
        label: "Branch Location",
        description: "Find our stores",
        to: "/profile/branches",
      },
      {
        icon: Wrench,
        label: "Service Center",
        description: "FAQ & support",
        to: "/profile/service-center",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: Languages,
        label: "Language",
        description: "English / Myanmar",
        to: "/profile/language",
      },
      {
        icon: FileText,
        label: "Terms & Policies",
        description: "Legal information",
        to: "/profile/terms",
      },
    ],
  },
];

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-dark flex items-center gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold">{user.name}</h1>
          <p className="text-sm text-white/70">{user.membership}</p>
        </div>
        <button
          onClick={logout}
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20"
        >
          Log out
        </button>
      </div>

      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
            {g.title}
          </h2>
          <div className="glass p-2">
            {g.items.map((i) => (
              <ProfileMenuRow
                key={i.to}
                icon={i.icon}
                label={i.label}
                description={i.description}
                to={i.to}
              />
            ))}
          </div>
        </section>
      ))}

      <Link to="/home" className="text-center text-sm font-semibold text-teal">
        Back to Home
      </Link>
    </div>
  );
}

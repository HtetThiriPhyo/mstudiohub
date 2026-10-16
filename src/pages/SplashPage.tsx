import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLogo from "../components/AppLogo";
import { useAppStore } from "../store/useAppStore";

export default function SplashPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  useEffect(() => {
    const t = setTimeout(
      () => navigate(isAuthenticated ? "/home" : "/login", { replace: true }),
      1900,
    );
    return () => clearTimeout(t);
  }, [navigate, isAuthenticated]);

  return (
    <div className="grid min-h-screen place-items-center bg-mist">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AppLogo size="lg" />
      </motion.div>
    </div>
  );
}

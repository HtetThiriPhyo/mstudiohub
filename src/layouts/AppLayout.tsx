import { useOutlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import MobileBottomNavigation from "../components/MobileBottomNavigation";

export default function AppLayout() {
  const outlet = useOutlet();

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader />
      {/* Pages render directly — there is no page-wide transition. Route
          changes swap the outlet instantly, so switching tabs never triggers
          a full-page fade/translate (which would force the frosted nav's
          backdrop-filter to re-composite on every frame). */}
      <main className="pb-safe-nav mx-auto w-full max-w-6xl flex-1 px-4 pt-6">
        {outlet}
      </main>
      <MobileBottomNavigation />
    </div>
  );
}

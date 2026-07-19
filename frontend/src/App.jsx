import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Clarity from "@microsoft/clarity";
import Landing from "./Landing.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

function routeFromHash() {
  return window.location.hash === "#/integritetspolicy" ? "privacy" : "landing";
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const clarityId = import.meta.env.VITE_CLARITY_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }, []);

  return (
    <>
      {route === "privacy" ? <PrivacyPolicy /> : <Landing />}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

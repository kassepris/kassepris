import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Clarity from "@microsoft/clarity";
import Landing from "./Landing.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import { WelcomePage } from "./WelcomePage.jsx";

function routeFromHash() {
  const [path, query] = window.location.hash.slice(1).split("?");
  if (path === "/integritetspolicy") return { name: "privacy" };
  if (path === "/valkommen") return { name: "welcome", status: new URLSearchParams(query || "").get("status") };
  return { name: "landing" };
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
      {route.name === "privacy" ? <PrivacyPolicy /> : null}
      {route.name === "welcome" ? <WelcomePage status={route.status} /> : null}
      {route.name === "landing" ? <Landing /> : null}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

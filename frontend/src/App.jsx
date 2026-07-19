import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
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

  return (
    <>
      {route === "privacy" ? <PrivacyPolicy /> : <Landing />}
      <Analytics />
    </>
  );
}

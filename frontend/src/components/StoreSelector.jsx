import { useEffect, useState } from "react";
import { fetchNearestStores, searchStores } from "../api";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const CHAIN_COLORS = {
  coop: "bg-red-100 text-red-700",
  ica: "bg-blue-100 text-blue-700",
  willys: "bg-amber-100 text-amber-700",
};

function ChainTag({ slug, name }) {
  const colors = CHAIN_COLORS[slug] || "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors}`}>{name}</span>;
}

function StoreRow({ store, onSelect }) {
  return (
    <button
      onClick={() => onSelect(store)}
      className="w-full flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all text-left"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <ChainTag slug={store.chain_slug} name={store.chain_name} />
          {store.distance_km != null && (
            <span className="text-xs text-gray-400">{store.distance_km.toFixed(1)} km</span>
          )}
        </div>
        <p className="font-medium text-gray-900 truncate">{store.name}</p>
        <p className="text-sm text-gray-500 truncate">
          {store.address}
          {store.city ? `, ${store.city}` : ""}
        </p>
      </div>
      <span className="text-green-600 text-sm font-medium whitespace-nowrap">Välj →</span>
    </button>
  );
}

export default function StoreSelector({ onStoreSelected }) {
  // 'asking' | 'locating' | 'nearby' | 'manual'
  const [stage, setStage] = useState("asking");
  const [nearbyStores, setNearbyStores] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationError("Din webbläsare stödjer inte platsdelning.");
      setStage("manual");
      return;
    }

    setStage("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const { stores } = await fetchNearestStores(latitude, longitude, 5);
          setNearbyStores(stores);
          setStage("nearby");
        } catch (err) {
          setLocationError(err.message);
          setStage("manual");
        }
      },
      () => {
        setLocationError("Vi kunde inte hämta din plats. Välj din butik manuellt nedan.");
        setStage("manual");
      },
      { timeout: 10000 }
    );
  }

  useEffect(() => {
    if (stage !== "manual") return;
    if (!debouncedQuery) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    searchStores(debouncedQuery)
      .then(({ stores }) => setSearchResults(stores))
      .catch(() => setSearchResults([]))
      .finally(() => setSearchLoading(false));
  }, [debouncedQuery, stage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Hitta erbjudanden nära dig</h1>
          <p className="text-gray-500">Vi visar priser och erbjudanden för din närmaste butik.</p>
        </div>

        {stage === "asking" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
            <button
              onClick={requestLocation}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Använd min plats
            </button>
            <button
              onClick={() => setStage("manual")}
              className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm font-medium py-2"
            >
              Välj butik manuellt istället
            </button>
          </div>
        )}

        {stage === "locating" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="animate-spin h-8 w-8 border-3 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Hämtar din plats...</p>
          </div>
        )}

        {stage === "nearby" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">Butiker nära dig:</p>
            {nearbyStores.map((store) => (
              <StoreRow key={store.id} store={store} onSelect={onStoreSelected} />
            ))}
            <button
              onClick={() => setStage("manual")}
              className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2"
            >
              Välj en annan butik istället
            </button>
          </div>
        )}

        {stage === "manual" && (
          <div>
            {locationError && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                {locationError}
              </p>
            )}
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök butik eller stad..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none mb-3"
            />
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchLoading && <p className="text-center text-gray-400 text-sm py-4">Söker...</p>}
              {!searchLoading && query && searchResults.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">Inga butiker hittades.</p>
              )}
              {searchResults.map((store) => (
                <StoreRow key={store.id} store={store} onSelect={onStoreSelected} />
              ))}
            </div>
            <button
              onClick={() => setStage("asking")}
              className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm font-medium py-2"
            >
              ← Tillbaka
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

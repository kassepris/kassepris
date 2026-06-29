import { useEffect, useMemo, useState } from "react";
import StoreSelector from "./components/StoreSelector";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";
import { fetchProducts, fetchCategories, fetchChains } from "./api";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const STORAGE_KEY = "matpriser.selectedStore";

const DEFAULT_FILTERS = {
  q: "",
  categories: [],
  chains: [],
  minPrice: "",
  maxPrice: "",
  isMember: false,
  hasDeal: false,
  sort: "title_asc",
  page: 1,
};

function loadStoredStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [store, setStore] = useState(loadStoredStore);
  const [categories, setCategories] = useState([]);
  const [chains, setChains] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [result, setResult] = useState({ products: [], total: 0, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQ = useDebouncedValue(filters.q, 300);

  useEffect(() => {
    fetchCategories().then(({ categories }) => setCategories(categories)).catch(() => {});
    fetchChains().then(({ chains }) => setChains(chains)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!store) return;
    setLoading(true);
    setError(null);

    fetchProducts({
      store_id: store.id,
      q: debouncedQ,
      category: filters.categories,
      chain: filters.chains,
      min_price: filters.minPrice ? Math.round(Number(filters.minPrice) * 100) : undefined,
      max_price: filters.maxPrice ? Math.round(Number(filters.maxPrice) * 100) : undefined,
      is_member: filters.isMember ? "true" : undefined,
      has_deal: filters.hasDeal ? "true" : undefined,
      sort: filters.sort,
      page: filters.page,
      page_size: 24,
    })
      .then(setResult)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [
    store,
    debouncedQ,
    filters.categories,
    filters.chains,
    filters.minPrice,
    filters.maxPrice,
    filters.isMember,
    filters.hasDeal,
    filters.sort,
    filters.page,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = filters.categories.length + filters.chains.length;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.isMember) count++;
    if (filters.hasDeal) count++;
    return count;
  }, [filters]);

  function selectStore(selected) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    setStore(selected);
    setFilters(DEFAULT_FILTERS);
  }

  function changeStore() {
    localStorage.removeItem(STORAGE_KEY);
    setStore(null);
  }

  function updateFilters(partial) {
    setFilters((prev) => ({ ...prev, ...partial, page: "page" in partial ? partial.page : 1 }));
  }

  function clearFilters() {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, q: prev.q }));
  }

  if (!store) {
    return <StoreSelector onStoreSelected={selectStore} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header store={store} onChangeStore={changeStore} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 max-w-xl">
          <SearchBar value={filters.q} onChange={(q) => updateFilters({ q })} />
        </div>

        <div className="flex justify-between items-center mb-4 lg:hidden">
          <p className="text-sm text-gray-500">{result.total} produkter</p>
          <button
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 bg-white"
          >
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        <div className="flex gap-6">
          <aside className={`w-72 flex-shrink-0 ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-20">
              <FilterPanel
                categories={categories}
                chains={chains}
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
                activeCount={activeFilterCount}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <p className="hidden lg:block text-sm text-gray-500 mb-4">{result.total} produkter</p>
            <ProductGrid products={result.products} loading={loading} error={error} />
            <Pagination
              page={filters.page}
              totalPages={result.total_pages}
              onPageChange={(page) => updateFilters({ page })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

async function request(path, params = {}) {
  const url = new URL(path, window.location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const v of value) url.searchParams.append(key, v);
    } else {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export function fetchProducts(filters) {
  return request("/api/products", filters);
}

export function fetchNearestStores(lat, lng, limit = 5) {
  return request("/api/stores/nearest", { lat, lng, limit });
}

export function searchStores(q, chain) {
  return request("/api/stores/search", { q, chain });
}

export function fetchCategories() {
  return request("/api/categories");
}

export function fetchChains() {
  return request("/api/chains");
}

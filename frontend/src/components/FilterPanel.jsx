const SORT_OPTIONS = [
  { value: "title_asc", label: "Namn (A–Ö)" },
  { value: "title_desc", label: "Namn (Ö–A)" },
  { value: "price_asc", label: "Pris (lägst först)" },
  { value: "price_desc", label: "Pris (högst först)" },
];

function Section({ title, children }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function CheckboxList({ options, selected, onToggle }) {
  return (
    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
      {options.map((opt) => (
        <label key={opt.slug} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(opt.slug)}
            onChange={() => onToggle(opt.slug)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          {opt.name}
        </label>
      ))}
    </div>
  );
}

export default function FilterPanel({ categories, chains, filters, onChange, onClear, activeCount }) {
  function toggleArrayValue(key, value) {
    const current = filters[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ [key]: next });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-gray-900">Filter</h2>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-sm text-green-700 hover:text-green-800 font-medium">
            Rensa ({activeCount})
          </button>
        )}
      </div>

      <Section title="Sortera">
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Kategori">
        <CheckboxList
          options={categories}
          selected={filters.categories}
          onToggle={(slug) => toggleArrayValue("categories", slug)}
        />
      </Section>

      <Section title="Butikskedja">
        <CheckboxList
          options={chains.map((c) => ({ slug: c.slug, name: c.name }))}
          selected={filters.chains}
          onToggle={(slug) => toggleArrayValue("chains", slug)}
        />
      </Section>

      <Section title="Pris (kr)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          />
        </div>
      </Section>

      <Section title="Övrigt">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasDeal}
              onChange={(e) => onChange({ hasDeal: e.target.checked })}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            Endast erbjudanden
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isMember}
              onChange={(e) => onChange({ isMember: e.target.checked })}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            Endast medlemspriser
          </label>
        </div>
      </Section>
    </div>
  );
}

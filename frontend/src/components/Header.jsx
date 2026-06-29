const CHAIN_COLORS = {
  coop: "bg-red-100 text-red-700",
  ica: "bg-blue-100 text-blue-700",
  willys: "bg-amber-100 text-amber-700",
};

export default function Header({ store, onChangeStore }) {
  const chainColor = CHAIN_COLORS[store.chain_slug] || "bg-gray-100 text-gray-700";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <h1 className="text-lg font-bold text-green-700 whitespace-nowrap">Matpriser</h1>
        <button
          onClick={onChangeStore}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left min-w-0"
        >
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${chainColor}`}>
            {store.chain_name}
          </span>
          <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{store.name}</span>
          <span className="text-xs text-gray-400 whitespace-nowrap">Byt butik</span>
        </button>
      </div>
    </header>
  );
}

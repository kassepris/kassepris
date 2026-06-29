export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        ← Föregående
      </button>
      {start > 1 && <span className="px-2 text-gray-400">…</span>}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium ${
            p === page ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && <span className="px-2 text-gray-400">…</span>}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        Nästa →
      </button>
    </div>
  );
}

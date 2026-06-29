import ProductCard from "./ProductCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-6 bg-gray-100 rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading, error }) {
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">Något gick fel</p>
        <p className="text-gray-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-700 font-medium">Inga produkter hittades</p>
        <p className="text-gray-500 text-sm mt-1">Försök justera dina filter eller sökning.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

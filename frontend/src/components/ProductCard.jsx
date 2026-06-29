import Badge from "./Badge";
import { formatPrice, formatValidUntil, thumbnailUrl } from "../format";

const CHAIN_COLORS = {
  coop: "bg-red-100 text-red-700",
  ica: "bg-blue-100 text-blue-700",
  willys: "bg-amber-100 text-amber-700",
};

export default function ProductCard({ product }) {
  const validUntil = formatValidUntil(product.valid_until);
  const chainColor = CHAIN_COLORS[product.chain_slug] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
        {product.image ? (
          <img
            src={thumbnailUrl(product.image)}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-300 text-sm">Ingen bild</span>
        )}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${chainColor}`}>
          {product.chain_name}
        </span>
        {product.deal && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white capitalize max-w-[55%] truncate">
            {product.deal}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="font-medium text-gray-900 leading-snug mb-0.5 line-clamp-2">{product.title || "Okänd produkt"}</p>
        <p className="text-sm text-gray-500 mb-2">
          {[product.brand, product.size].filter(Boolean).join(" · ") || " "}
        </p>

        {product.badges?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.badges.map((badge) => (
              <Badge key={badge.slug} badge={badge} />
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price_cents)}</span>
            {product.unit && <span className="text-sm text-gray-400">{product.unit}</span>}
          </div>
          {product.comparison_price && <p className="text-xs text-gray-400">{product.comparison_price}</p>}
          <div className="flex items-center justify-between mt-1">
            {product.is_member && (
              <span className="text-xs font-medium text-purple-700">Medlemspris</span>
            )}
            {validUntil && <span className="text-xs text-gray-400">t.o.m. {validUntil}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

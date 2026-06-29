export function formatPrice(cents) {
  if (cents == null) return "—";
  return (cents / 100).toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr";
}

export function formatValidUntil(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("sv-SE", { day: "numeric", month: "short" });
}

// Coop's raw image URLs point at Cloudinary's full, untransformed original
// asset (seen up to 11MB for a single product thumbnail) - no resize params
// baked in, unlike ICA/Willys's CDN URLs. Inject one so the browser isn't
// downloading megabytes for a 200px card image.
export function thumbnailUrl(url) {
  if (!url) return url;
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    return url.replace("/image/upload/", "/image/upload/w_300,h_300,c_limit,q_auto,f_auto/");
  }
  return url;
}

const TYPE_STYLES = {
  certification: "bg-green-100 text-green-700",
  dietary: "bg-sky-100 text-sky-700",
  origin: "bg-indigo-100 text-indigo-700",
  storage: "bg-cyan-100 text-cyan-700",
  hazard: "bg-red-100 text-red-700",
  age_restriction: "bg-red-100 text-red-700",
  loyalty: "bg-purple-100 text-purple-700",
  store_specific: "bg-gray-100 text-gray-700",
  deal_type: "bg-orange-100 text-orange-700",
};

export default function Badge({ badge }) {
  const style = TYPE_STYLES[badge.type] || "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${style}`}>
      {badge.icon && <img src={badge.icon} alt="" className="w-3 h-3" />}
      {badge.label}
    </span>
  );
}

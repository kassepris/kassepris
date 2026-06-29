from flask import Blueprint, jsonify, request

from app.db import get_pool

products_bp = Blueprint("products", __name__, url_prefix="/api")

SORT_OPTIONS = {
    "price_asc": "sp.price_cents ASC NULLS LAST",
    "price_desc": "sp.price_cents DESC NULLS LAST",
    "title_asc": "p.title ASC",
    "title_desc": "p.title DESC",
}

PAGE_SIZE_DEFAULT = 24
PAGE_SIZE_MAX = 100


def _escape_ilike(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def _parse_bool(value: str | None) -> bool | None:
    if value is None:
        return None
    return value.lower() in ("1", "true", "yes")


def _parse_int(value: str | None, default: int) -> int:
    if value is None or value == "":
        return default
    try:
        return int(value)
    except ValueError:
        return default


@products_bp.get("/products")
def list_products():
    store_id = request.args.get("store_id")
    if not store_id:
        return jsonify({"error": "store_id is required - choose a store first"}), 400

    q = request.args.get("q", "").strip()
    categories = request.args.getlist("category")
    chains = request.args.getlist("chain")
    min_price = _parse_int(request.args.get("min_price"), None) if request.args.get("min_price") else None
    max_price = _parse_int(request.args.get("max_price"), None) if request.args.get("max_price") else None
    is_member = _parse_bool(request.args.get("is_member"))
    has_deal = _parse_bool(request.args.get("has_deal"))
    sort = request.args.get("sort", "title_asc")
    if sort not in SORT_OPTIONS:
        sort = "title_asc"
    page = max(1, _parse_int(request.args.get("page"), 1))
    page_size = min(PAGE_SIZE_MAX, max(1, _parse_int(request.args.get("page_size"), PAGE_SIZE_DEFAULT)))
    offset = (page - 1) * page_size

    conditions = ["sp.store_id = %(store_id)s"]
    params = {"store_id": store_id}

    if q:
        conditions.append("p.title ILIKE %(q)s")
        params["q"] = f"%{_escape_ilike(q)}%"
    if categories:
        conditions.append("p.category_slug = ANY(%(categories)s)")
        params["categories"] = categories
    if chains:
        conditions.append("c.slug = ANY(%(chains)s)")
        params["chains"] = chains
    if min_price is not None:
        conditions.append("sp.price_cents >= %(min_price)s")
        params["min_price"] = min_price
    if max_price is not None:
        conditions.append("sp.price_cents <= %(max_price)s")
        params["max_price"] = max_price
    if is_member is not None:
        conditions.append("sp.is_member = %(is_member)s")
        params["is_member"] = is_member
    if has_deal is not None:
        conditions.append("(sp.deal IS NOT NULL) = %(has_deal)s")
        params["has_deal"] = has_deal

    where_clause = " AND ".join(conditions)
    order_clause = SORT_OPTIONS[sort]

    sql = f"""
        SELECT
            p.id, p.gtin, p.title, p.image, p.brand, p.size, p.more_info, p.badges,
            p.category_slug, p.category_name, p.variant_group,
            c.slug AS chain_slug, c.name AS chain_name,
            sp.price_cents, sp.unit, sp.comparison_price, sp.deal, sp.is_member, sp.valid_until,
            count(*) OVER() AS total_count
        FROM store_product sp
        JOIN product p ON p.id = sp.product_id
        JOIN chain c ON c.id = p.chain_id
        WHERE {where_clause}
        ORDER BY {order_clause}
        LIMIT %(limit)s OFFSET %(offset)s
    """
    params["limit"] = page_size
    params["offset"] = offset

    with get_pool().connection() as conn:
        rows = conn.execute(sql, params).fetchall()

    total = rows[0]["total_count"] if rows else 0

    products = []
    for row in rows:
        row.pop("total_count")
        products.append(row)

    return jsonify(
        {
            "products": products,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": (total + page_size - 1) // page_size if total else 0,
        }
    )

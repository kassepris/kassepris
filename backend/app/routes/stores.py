from flask import Blueprint, jsonify, request

from app.db import get_pool

stores_bp = Blueprint("stores", __name__, url_prefix="/api")

STORE_FIELDS = "s.id, s.name, s.address, s.city, s.latitude, s.longitude, c.slug AS chain_slug, c.name AS chain_name"


@stores_bp.get("/stores/nearest")
def nearest_stores():
    try:
        lat = float(request.args["lat"])
        lng = float(request.args["lng"])
    except (KeyError, ValueError):
        return jsonify({"error": "lat and lng query params are required and must be numbers"}), 400

    limit = min(50, max(1, int(request.args.get("limit", 10))))

    sql = f"""
        SELECT {STORE_FIELDS},
            (6371 * acos(
                LEAST(1.0, GREATEST(-1.0,
                    cos(radians(%(lat)s)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(%(lng)s))
                    + sin(radians(%(lat)s)) * sin(radians(s.latitude))
                ))
            )) AS distance_km
        FROM stores s
        JOIN chain c ON c.id = s.chain_id
        WHERE s.latitude IS NOT NULL AND s.longitude IS NOT NULL
        ORDER BY distance_km ASC
        LIMIT %(limit)s
    """
    with get_pool().connection() as conn:
        rows = conn.execute(sql, {"lat": lat, "lng": lng, "limit": limit}).fetchall()

    return jsonify({"stores": rows})


@stores_bp.get("/stores/search")
def search_stores():
    q = request.args.get("q", "").strip()
    chains = request.args.getlist("chain")
    limit = min(100, max(1, int(request.args.get("limit", 30))))

    conditions = []
    params = {"limit": limit}

    if q:
        conditions.append("(s.name ILIKE %(q)s OR s.city ILIKE %(q)s)")
        params["q"] = f"%{q}%"
    if chains:
        conditions.append("c.slug = ANY(%(chains)s)")
        params["chains"] = chains

    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""

    sql = f"""
        SELECT {STORE_FIELDS}
        FROM stores s
        JOIN chain c ON c.id = s.chain_id
        {where_clause}
        ORDER BY s.name ASC
        LIMIT %(limit)s
    """
    with get_pool().connection() as conn:
        rows = conn.execute(sql, params).fetchall()

    return jsonify({"stores": rows})

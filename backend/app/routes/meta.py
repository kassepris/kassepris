from flask import Blueprint, jsonify

from app.db import get_pool

meta_bp = Blueprint("meta", __name__, url_prefix="/api")


@meta_bp.get("/categories")
def list_categories():
    sql = """
        SELECT DISTINCT category_slug AS slug, category_name AS name
        FROM product
        WHERE category_slug IS NOT NULL
        ORDER BY category_name ASC
    """
    with get_pool().connection() as conn:
        rows = conn.execute(sql).fetchall()
    return jsonify({"categories": rows})


@meta_bp.get("/chains")
def list_chains():
    sql = "SELECT slug, name FROM chain ORDER BY name ASC"
    with get_pool().connection() as conn:
        rows = conn.execute(sql).fetchall()
    return jsonify({"chains": rows})

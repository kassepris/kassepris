from pathlib import Path

import psycopg
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from app.db import init_pool


def create_app():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")

    app = Flask(__name__)
    app.json.ensure_ascii = False
    CORS(app)

    init_pool()

    from app.routes.products import products_bp
    from app.routes.stores import stores_bp
    from app.routes.meta import meta_bp

    app.register_blueprint(products_bp)
    app.register_blueprint(stores_bp)
    app.register_blueprint(meta_bp)

    @app.errorhandler(psycopg.errors.InvalidTextRepresentation)
    def handle_bad_input(err):
        return jsonify({"error": "invalid query parameter"}), 400

    @app.errorhandler(404)
    def handle_not_found(err):
        return jsonify({"error": "not found"}), 404

    @app.errorhandler(Exception)
    def handle_unexpected_error(err):
        app.logger.exception("Unhandled error")
        return jsonify({"error": "internal server error"}), 500

    return app

import os

from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

_pool: ConnectionPool | None = None


def init_pool():
    global _pool
    db_url = os.environ["DB_URL"]
    _pool = ConnectionPool(db_url, min_size=1, max_size=10, kwargs={"row_factory": dict_row})
    _pool.wait()


def get_pool() -> ConnectionPool:
    if _pool is None:
        raise RuntimeError("DB pool not initialized - call init_pool() first")
    return _pool

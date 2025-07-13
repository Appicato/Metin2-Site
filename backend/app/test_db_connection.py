from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

# .env laden
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?sslmode=require"

def test_db():
    try:
        engine = create_engine(DATABASE_URL, echo=True, future=True)

        with engine.connect() as conn:
            result = conn.execute(text("SELECT NOW()"))
            print("DB Connection successful. Time now:", result.scalar())

    except Exception as e:
        print("Failed to connect to DB:", e)

if __name__ == "__main__":
    test_db()

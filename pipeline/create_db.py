import sqlite3
from pathlib import Path

DB_PATH = Path("../data/vocab.db")

def create_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        language TEXT NOT NULL,
        simplified TEXT,
        traditional TEXT,
        pinyin TEXT,
        definition TEXT NOT NULL,
        pos TEXT,
        frequency_rank INTEGER
    )
    """)

    cursor.execute("CREATE INDEX IF NOT EXISTS idx_lang_simp ON words(language, simplified)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_lang_trad ON words(language, traditional)")

    conn.commit()
    conn.close()

    print("Database and table created successfully.")

if __name__ == "__main__":
    create_database()

import sqlite3
from pathlib import Path

DB_PATH = Path("../data/vocab.db")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Sample query to fetch some Chinese words
cursor.execute("""
SELECT simplified, pinyin, definition 
FROM words 
WHERE language='zh' 
LIMIT 10
""")

rows = cursor.fetchall()

for row in rows:
    print(row)

# Count total Chinese words in the database
cursor.execute("SELECT COUNT(*) FROM words WHERE language='zh'")
print(cursor.fetchone())

conn.close()

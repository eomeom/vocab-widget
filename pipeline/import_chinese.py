import sqlite3
import re
from pathlib import Path

DB_PATH = Path("../data/vocab.db")
CEDICT_PATH = Path("../data/cedict_ts.txt")  # change if you kept .u8

def parse_line(line):
    if line.startswith("#"):
        return None

    pattern = r"(\S+)\s+(\S+)\s+\[(.+?)\]\s+/(.+)/"
    match = re.match(pattern, line)

    if not match:
        return None

    traditional = match.group(1)
    simplified = match.group(2)
    pinyin = match.group(3)
    definitions = match.group(4).split("/")
    first_definition = definitions[0]

    return traditional, simplified, pinyin, first_definition

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    inserted = 0

    with open(CEDICT_PATH, "r", encoding="utf-8") as f:
        for line in f:
            parsed = parse_line(line)
            if parsed:
                traditional, simplified, pinyin, definition = parsed

                cursor.execute("""
                    INSERT INTO words (language, simplified, traditional, pinyin, definition)
                    VALUES (?, ?, ?, ?, ?)
                """, ("zh", simplified, traditional, pinyin, definition))

                inserted += 1

                if inserted % 10000 == 0:
                    print(f"Inserted {inserted} entries...")

    conn.commit()
    conn.close()

    print(f"\nFinished. Total inserted: {inserted}")

if __name__ == "__main__":
    main()

import sqlite3


class Database:
    def __init__(self, db_file):
        self.db_file = db_file
        self.create_table()

    def create_table(self):
        conn = sqlite3.connect(self.db_file)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS videos (
                id TEXT PRIMARY KEY,
                title TEXT,
                thumbnail TEXT,
                video TEXT,
                creator TEXT
            )
        ''')
        conn.commit()
        conn.close()

    def insert_entry(self, video_id, title, thumbnail, video, creator):
        try:
            conn = sqlite3.connect(self.db_file)
            c = conn.cursor()
            c.execute('''
                INSERT INTO videos (id, title, thumbnail, video, creator)
                VALUES (?, ?, ?, ?, ?)
            ''', (video_id, title, thumbnail, video, creator))
            conn.commit()
            conn.close()
        except sqlite3.IntegrityError:
            return False
        return True

    def retrieve_entries(self):
        conn = sqlite3.connect(self.db_file)
        c = conn.cursor()
        c.execute('SELECT id, title, thumbnail, video, creator FROM videos')
        rows = c.fetchall()
        conn.close()

        entries = []
        for row in rows:
            entry = {
                'id': row[0],
                'title': row[1],
                'thumbnail': row[2],
                'video': row[3],
                'creator': row[4]
            }
            entries.append(entry)

        return entries

    def search_entry_by_id(self, entry_id):
        conn = sqlite3.connect(self.db_file)
        c = conn.cursor()
        c.execute('SELECT id, title, thumbnail, video, creator FROM videos WHERE id = ?', (entry_id,))
        row = c.fetchone()
        conn.close()

        if row is None:
            return None

        entry = {
            'id': row[0],
            'title': row[1],
            'thumbnail': row[2],
            'video': row[3],
            'creator': row[4]
        }

        return entry

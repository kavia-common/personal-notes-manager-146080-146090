import * as SQLite from 'expo-sqlite';

export type Note = {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const DB_NAME = 'notes.db';

let db: SQLite.SQLiteDatabase | null = null;

/**
 * PUBLIC_INTERFACE
 * Initialize and get the SQLite database instance.
 * Ensures notes table exists.
 */
export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at DESC);
  `);
  return db;
}

/**
 * PUBLIC_INTERFACE
 * Create a new note.
 */
export async function createNote(title: string, content: string): Promise<number> {
  const database = await getDb();
  const res = await database.runAsync(
    `INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))`,
    [title.trim(), content.trim()]
  );
  return res.lastInsertRowId ?? 0;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note by id.
 */
export async function updateNote(id: number, title: string, content: string): Promise<void> {
  const database = await getDb();
  await database.runAsync(
    `UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?`,
    [title.trim(), content.trim(), id]
  );
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by id.
 */
export async function deleteNote(id: number): Promise<void> {
  const database = await getDb();
  await database.runAsync(`DELETE FROM notes WHERE id = ?`, [id]);
}

/**
 * PUBLIC_INTERFACE
 * Get a single note by id.
 */
export async function getNote(id: number): Promise<Note | null> {
  const database = await getDb();
  const row = await database.getFirstAsync<Note>(`SELECT * FROM notes WHERE id = ?`, [id]);
  return row ?? null;
}

/**
 * PUBLIC_INTERFACE
 * Get all notes sorted by updated_at desc.
 */
export async function getAllNotes(): Promise<Note[]> {
  const database = await getDb();
  const rows = await database.getAllAsync<Note>(`SELECT * FROM notes ORDER BY updated_at DESC`);
  return rows ?? [];
}

/**
 * PUBLIC_INTERFACE
 * Search notes by title or content.
 */
export async function searchNotes(query: string): Promise<Note[]> {
  const database = await getDb();
  const like = `%${query}%`;
  const rows = await database.getAllAsync<Note>(
    `SELECT * FROM notes WHERE title LIKE ? OR content LIKE ? ORDER BY updated_at DESC`,
    [like, like]
  );
  return rows ?? [];
}

import sqlite from 'better-sqlite3';

const db = new sqlite('../garden.sqlite');

const schema = `CREATE TABLE IF NOT EXISTS images(
    id INTEGER NOT NULL PRIMARY KEY, 
    path TEXT NOT NULL,
    timestamp TEXT NOT NULL
)`;

db.exec(schema);

export default db;

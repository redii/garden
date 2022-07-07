const sqlite = require("better-sqlite3")
const db = new sqlite("../garden.sqlite")

const schema = `CREATE TABLE IF NOT EXISTS images(
    id INTEGER NOT NULL PRIMARY KEY,
    timestamp TEXT NOT NULL
)`

db.exec(schema)

module.exports = db

import { Database } from "bun:sqlite";

const db = new Database(":memory:", {
  strict: true,
});
db.run("PRAGMA journal_mode = WAL;");
// const query = db.query("select 'Hello world' as message;");
// query.get();

export default db;

import { MongoClient, type Db } from "mongodb";

const uri = import.meta.env.MONGODB_URI as string;
const db_name = import.meta.env.DB_NAME as string;

interface Pool {
  client: null | MongoClient;
  db: null | Db;
  connect: () => Promise<Db>;
  close: () => void;
}

const pool: Pool = {
  client: null,
  db: null,

  async connect(): Promise<Db> {
    if (this.db) return this.db;

    this.client = new MongoClient(uri);

    await this.client.connect();
    this.db = this.client.db(db_name);
    return this.db;
  },

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  },
};

export default pool;

import { IDatabase, Result } from "@module/db";

import { Pool } from "pg";

class Database implements IDatabase {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "your_username",
      host: "your_host",
      database: "your_database",
      password: "your_password",
      port: 5432,
    });
  }

  public async query<T>(query: string): Promise<Result<T>> {
    const result = await this.pool.query(query);
    return { rows: result.rows };
  }
}

export default Database;

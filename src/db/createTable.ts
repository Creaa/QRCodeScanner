import { getDBConnection } from "./getDBConnection";

const createTable = async () => {
    const db = await getDBConnection();
    await db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS qr_codes (
          uuid TEXT PRIMARY KEY,
          code TEXT NOT NULL,
          scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          synchronized_date TIMESTAMP,
          is_synchronized BOOLEAN DEFAULT 0,
          is_removed BOOLEAN DEFAULT 0
        );`
        );
    });
};

export default createTable;
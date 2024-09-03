import { getDBConnection } from "./getDBConnection";

const clearAllData = async () => {
    const db = await getDBConnection();
    await db.transaction(tx => {
        tx.executeSql('DELETE FROM qr_codes');
    });
};

export default clearAllData;
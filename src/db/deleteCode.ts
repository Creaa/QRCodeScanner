import { getDBConnection } from "./getDBConnection";

const deleteRecord = async (uuid: string) => {
    const db = await getDBConnection();
    await db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM qr_codes WHERE uuid = ?',
            [uuid]
        );
    });
};

export default deleteRecord;
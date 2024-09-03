import { getDBConnection } from './getDBConnection';

const deleteCodesDB = async (uuids: string[]): Promise<void> => {
    const db = await getDBConnection();

    const uuidList = uuids.map(uuid => `'${uuid}'`).join(',');

    await db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM qr_codes WHERE uuid IN (${uuidList})`,
            [],
            () => {
                console.log('Records deleted successfully.');
            },
            (tx, error) => {
                console.error('Error deleting records:', error);
            }
        );
    });
};

export default deleteCodesDB;
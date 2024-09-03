import { getDBConnection } from './getDBConnection';

const synchronizeCodesDB = async (ids: string[]) => {
    const db = await getDBConnection();
    const currentTimestamp = new Date().toISOString();

    const idList = ids.map(id => `'${id}'`).join(',');

    await db.transaction(tx => {
        tx.executeSql(
            `UPDATE qr_codes
             SET is_synchronized = 1, synchronized_date = ?
             WHERE uuid IN (${idList})`,
            [currentTimestamp],
            () => {
                console.log('Records synchronized successfully.');
            },
            (tx, error) => {
                console.error('Error synchronizing records:', error);
            }
        );
    });
};

export default synchronizeCodesDB;
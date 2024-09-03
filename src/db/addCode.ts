import { getDBConnection } from './getDBConnection';

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const addCode = async (code: string) => {
    const uuid = generateUUID();
    const db = await getDBConnection();
    await db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO qr_codes (uuid, code, scan_date) VALUES (?, ?, ?)',
            [uuid, code, new Date().toISOString()]
        );
    });
};

export default addCode;
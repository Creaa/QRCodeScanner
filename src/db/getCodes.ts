import { useState, useEffect, useCallback } from 'react';
import { getDBConnection } from './getDBConnection';
import { SQLError } from 'react-native-sqlite-storage';
import QRCode from '../interfaces/QRCode';

const useQRCodeData = () => {
    const [data, setData] = useState<QRCode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<SQLError | null>(null);

    const fetchCodes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const db = await getDBConnection();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM qr_codes',
                    [],
                    (tx, results) => {
                        const rows = results.rows.raw().map(row => ({
                            ...row,
                            is_synchronized: row.is_synchronized === 1,
                            is_removed: row.is_removed === 1,
                        })); setData(rows);
                        setIsLoading(false);
                    },
                    (tx, error) => {
                        setError(error);
                        setIsLoading(false);
                    }
                );
            });
        } catch (dbError) {
            setError(dbError as SQLError);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCodes();
    }, [fetchCodes]);

    return { data, isLoading, error, refetch: fetchCodes };
};

export default useQRCodeData;
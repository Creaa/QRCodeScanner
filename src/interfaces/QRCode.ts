interface QRCode {
    uuid: string;
    code: string;
    scan_date: string;
    is_synchronized: boolean;
    synchronized_date: string | null;
    is_removed: boolean;
}

export default QRCode;
import { atom } from 'jotai';
import QRCode from '../interfaces/QRCode';

export const qrCodesAtom = atom<QRCode[]>([]);
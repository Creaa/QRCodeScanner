import axios from 'axios';
import synchronizeCodesDB from '../db/synchronizeCodesDB';

const synchronizeCodes = async (ids: string[]): Promise<void> => {
    try {
        console.log('Starting synchronization');

        await axios.get('https://jsonplaceholder.typicode.com/todos/1');

        await synchronizeCodesDB(ids);

        console.log('Synchronization complete');
    } catch (error) {
        console.error('Error during synchronization:', error);
        throw error;
    }
};

export default synchronizeCodes;
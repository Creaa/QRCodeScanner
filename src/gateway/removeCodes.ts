import axios from 'axios';
import deleteCodesDB from '../db/deleteCodes';

const removeCodes = async (ids: string[]): Promise<void> => {
    try {
        console.log('Starting removing');

        await axios.get('https://jsonplaceholder.typicode.com/todos/1');

        await deleteCodesDB(ids);

        console.log('Removing complete');
    } catch (error) {
        console.error('Error during removing:', error);
        throw error;
    }
};

export default removeCodes;
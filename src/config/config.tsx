import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL;

// Define the full URL for getting all orders
const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;

export { BASE_URL,GET_ALL_ORDERS_URL };


export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
}

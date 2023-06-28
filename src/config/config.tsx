import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL;

// Define the full URL for getting all orders
const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;

export { BASE_URL,GET_ALL_ORDERS_URL };

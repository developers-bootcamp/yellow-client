// const BASE_URL = process.env.BASE_URL;
const BASE_URL = "http://localhost:8080"
// Define the full URL for getting all orders
const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;
const Log_In =`${BASE_URL}/User/login`;
export { BASE_URL,GET_ALL_ORDERS_URL,Log_In };


export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
}

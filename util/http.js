import axios from "axios";

BACKEND_URL = 'https://react-native-course-50cee-default-rtdb.firebaseio.com';

export function storeExpense(expenseData) {
    axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    );
}

export async function fetchExpense() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];

    for (const key in response.data) {
        const responseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(responseObj);
    }
    
    return expenses;
}
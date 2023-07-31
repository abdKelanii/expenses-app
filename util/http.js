import axios from "axios";

export function storeExpense(expenseData) {
    axios.post(
        'https://react-native-course-50cee-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    );
}
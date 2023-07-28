import { useReducer } from "react";
import { createContext } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e2',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e3',
        description: 'Apples',
        amount: 9.99,
        date: new Date('2022-12-22')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 10,
        date: new Date('2022-02-12')
    },
    {
        id: 'e5',
        description: 'A book',
        amount: 10,
        date: new Date('2022-04-12')
    },
    {
        id: 'e1',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e2',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e3',
        description: 'Apples',
        amount: 9.99,
        date: new Date('2022-12-22')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 10,
        date: new Date('2022-02-12')
    },
    {
        id: 'e5',
        description: 'A book',
        amount: 10,
        date: new Date('2022-04-12')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});


function expnsesReducer(state, action ){
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
        case 'UDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const udatableExpense = state[updatableExpenseIndex];
            const updateItem = {...updateExpense, ...action.payload.data};
            const udatedExpenses = [...state];
            udatedExpenses[updatableExpenseIndex] = updateItem; 
            return udatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function expensesContextProvider({ children }) {
    
    const [expensesState, dispatch] = useReducer(expnsesReducer, DUMMY_EXPENSES);

    function addExpense( expenseData ) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense( id ) {
        dispatch({type: 'DELETE', payload: id});
    }

    function deleteExpense( id, expenseData ) {
        dispatch({type: 'UPDATE', payload: { id: id, data: expenseData }}); 
    }
    
    return (
        <ExpensesContext.Provider>
            { children }
        </ExpensesContext.Provider>
    )
}

export default expensesContextProvider;

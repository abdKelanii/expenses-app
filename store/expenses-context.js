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
        id: 'e6',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e7',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e8',
        description: 'Apples',
        amount: 9.99,
        date: new Date('2022-12-22')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 10,
        date: new Date('2022-02-12')
    },
    {
        id: 'e10',
        description: 'A book',
        amount: 10,
        date: new Date('2022-04-12')
    },
    {
        id: 'e11',
        description: 'T-shirt',
        amount: 49.99,
        date: new Date('2023-07-28')
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
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const udatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...udatableExpense, ...action.payload.data};
            const udatedExpenses = [...state];
            udatedExpenses[updatableExpenseIndex] = updatedItem; 
            return udatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    
    const [expensesState, dispatch] = useReducer(expnsesReducer, DUMMY_EXPENSES);

    function addExpense( expenseData ) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense( id ) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense( id, expenseData ) {
        dispatch({type: 'UPDATE', payload: { id: id, data: expenseData }}); 
    }
    
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense:deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            { children }
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;
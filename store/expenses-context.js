import { useReducer } from "react";
import { createContext } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expense) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expnsesReducer(state, action ){
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
        case 'SET':
            return action.payload;
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
    
    const [expensesState, dispatch] = useReducer(expnsesReducer, []);

    function addExpense( expenseData ) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function setExpenses(expenses) {
        dispatch( { type: 'SET', payload: expenses } )
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
        setExpenses: setExpenses,
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
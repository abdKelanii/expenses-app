import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverly from "../components/UI/LoadingOverly";
import ErrorOverly from "../components/UI/ErrorOverly";

function RecentExpenses(){
    
    const [isFetching, setIsFetching ] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    
    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpense();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!')
            }
            setIsFetching(false);
        }
        getExpenses();
    },[]);

    function errorHandler() {
        setError(null);
    }

    if(error && !isFetching) {
        return <ErrorOverly message={error} onConfirm={errorHandler}/>
    }

    if ( isFetching ) { return <LoadingOverly /> }
    

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const sevenDaysAgo = getDateMinusDays(today, 7);
        
        return (expense.date >sevenDaysAgo) && (expense.date <= today);
    })

    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses registred in the past 7 days."/>
        )
}

export default RecentExpenses;
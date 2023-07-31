import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverly from "../components/UI/LoadingOverly";

function RecentExpenses(){
    
    const [isFetching, setIsFetching ] = useState(true);

    const expensesCtx = useContext(ExpensesContext);
    
    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            const expenses = await fetchExpense();
            setIsFetching(false);
            expensesCtx.setExpenses(expenses);
        }
        getExpenses();
    },[]);

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
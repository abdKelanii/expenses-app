import { useContext, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { useEffect } from "react";
import { fetchExpense } from "../util/http";

function RecentExpenses(){

    // const expensesCtx = useContext(ExpensesContext);

    const [fetchedExpenses, setFetchedExpenses] = useState([]);
    
    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpense();
            setFetchedExpenses(expenses);
        }
        getExpenses();
    },[])
    

    const recentExpenses = fetchedExpenses.filter((expense) => {
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
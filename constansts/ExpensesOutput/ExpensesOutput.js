import { View, StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'T-shirt',
        amount: 49.99,
        data: new Date('2022-12-01')
    },
    {
        id: 'e2',
        description: 'T-shirt',
        amount: 49.99,
        data: new Date('2022-12-01')
    },
    {
        id: 'e3',
        description: 'Apples',
        amount: 9.99,
        data: new Date('2022-12-22')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 10,
        data: new Date('2022-02-12')
    },
    {
        id: 'e5',
        description: 'A book',
        amount: 10,
        data: new Date('2022-04-12')
    },
]

function ExpensesOutput({ expenses, expensesPeriod }) {
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.color.primary700
    }
})




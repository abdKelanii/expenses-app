import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constansts/styles";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useState } from "react";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverly from "../components/UI/LoadingOverly";
import ErrorOverly from "../components/UI/ErrorOverly";


function ManageExpenses({ route, navigation }){

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        expense =>  expense.id  === editedExpenseId
    )
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);
    
    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later')
            setIsSubmitting(false);
        }
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        try {
            if ( isEditing ) { 
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later.')
            setIsSubmitting(false);
        }
    }

    function errorHandler() {
        setError(null)
    }
    
    if(error && !isSubmitting) {
        return <ErrorOverly message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting) {
        return <LoadingOverly /> 
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                onCancel={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon='trash' 
                        color={GlobalStyles.color.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
}
export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.color.primary800,
    },
    deleteContainer: {
        marginTop: 16, 
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.color.primary200,
        alignItems: 'center'
    },
})

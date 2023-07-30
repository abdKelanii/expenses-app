import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFromattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}){

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFromattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description.toString() : '',
            isValid: true
        }
    });
    
    function inputChangeHandler(inputIdentifire, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifire]: {value: enteredValue, isValid: true},
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            // The plus sign convert the string value to a number
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };
        
        // Validation
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descIsValid) {
            // Alert.alert('Invalid Input', 'Please check your input values!');
            setInputs((curInput) => {
                return {
                    amount: {
                        value: curInput.amount.value, isValid: amountIsValid
                    },
                    date: {
                        value: curInput.date.value, isValid: dateIsValid
                    },
                    description: {
                        value: curInput.description.value, isValid: descIsValid
                    },
                }
            })
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid ||!inputs.date.isValid ||!inputs.description.isValid;

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount" 
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                />
                <Input 
                    label="Date" 
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10 ,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}/>
            </View>
            <Input label="Description" textInputConfig={{
                autoCorrect: false,
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}/>

            {formIsInvalid &&
                <Text>Invalid input values - please check your entered data</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                     {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', 
        marginBottom: 10,
        textAlign: 'center'
    },  
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    }, 
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})
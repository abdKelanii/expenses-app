import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constansts/styles";

function Input({label, textInputConfig}) {

    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.color.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.color.primary100,
        color: GlobalStyles.color.primary700,
        padding:6, 
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    }
}) 
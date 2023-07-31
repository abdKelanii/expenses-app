import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constansts/styles";
import Button from "./Button";

function ErrorOverly({message, onConfirm}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okey</Button>
        </View>
    )
}

export default ErrorOverly;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.color.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize:20,
        fontWeight: 'bold'
    },
    message: { 
        fontSize: 14
    },
})
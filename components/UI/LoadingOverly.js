import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constansts/styles";

function LoadingOverly() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color="white"/>
        </View>
    )
}

export default LoadingOverly;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.color.primary700
    }
})
import { View } from "react-native";
import Input from "./Input";

function ExpenseForm(){
    
    function amoutnChangeHandler() {}

    return(
        <View>
            <Input label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amoutnChangeHandler,
            }}/>
            <Input label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10 ,
                onChangeText: () => {}
            }}/>
            <Input label="Description" textInputConfig={{
                autoCorrect: false,
                multiline: true
            }}/>
        </View>
    )
}

export default ExpenseForm;
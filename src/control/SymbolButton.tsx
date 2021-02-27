import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { AppStyle } from "../../styles/default";
import { Icon } from "react-native-vector-icons/Icon";

const SymbolButton = ({ onPress, symbol, title }) => {
    return (
        <TouchableOpacity accessibilityActions={[{ name: "click", label: title}]} 
            onPress={onPress} style={styles.appButtonContainer}>
            <Icon name={symbol}></Icon>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 3,
        borderRadius: 3,
        backgroundColor: AppStyle.buttonBackground,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    appButtonText: {
        color: AppStyle.buttonText,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default SymbolButton;
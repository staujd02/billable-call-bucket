import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { AppStyle } from "../../styles/default";
import { FontAwesome5 } from '@expo/vector-icons';
import { SymbolButtonProps } from "../../types/controls";

const SymbolButton = ({ onPress, symbol, title }: SymbolButtonProps) => {
    return (
        <TouchableOpacity accessibilityActions={[{ name: "click", label: title}]} 
            onPress={onPress} style={styles.appButtonContainer}>
            <FontAwesome5 name={symbol} size={24} color="black" />
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
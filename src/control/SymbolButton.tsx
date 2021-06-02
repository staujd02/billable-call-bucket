import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { AppColorStyles } from "../../styles/default";
import { SymbolButtonProps } from "../../types/controls";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SymbolButton = ({ onPress, symbol, title }: SymbolButtonProps) => {
    return (
        <TouchableOpacity accessibilityActions={[{ name: "click", label: title}]} 
            onPress={onPress} style={styles.appButtonContainer}>
            <FontAwesomeIcon icon={symbol} size={24} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 3,
        borderRadius: 3,
        backgroundColor: AppColorStyles.buttonBackground,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    appButtonText: {
        color: AppColorStyles.buttonText,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default SymbolButton;
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from 'react-native';
import { AppColorStyles } from "../../styles/default";
import { AppButtonProps } from "../../types/controls";

const AppButton = ({ onPress, title, styleOverrides }: AppButtonProps) => (
    <TouchableOpacity
        accessibilityActions={[{ name: "click", label: title }]} 
        onPress={onPress} 
        style={{ ...styleOverrides, ...styles.appButtonContainer }}>
            <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

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

export default AppButton;
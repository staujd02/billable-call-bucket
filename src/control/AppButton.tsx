import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from 'react-native';
import { AppStyle } from "../../styles/default";
import { AppButtonProps } from "../../types/controls";

const AppButton = ({ onPress, title }: AppButtonProps) => (
    <TouchableOpacity accessibilityActions={[{name: "click", label: title}]} onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

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

export default AppButton;
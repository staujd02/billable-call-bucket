import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppStyle } from "../../styles/default";
import { FontAwesome5 } from '@expo/vector-icons';
import { MultiActionButtonProps } from "../../types/controls";

const MultiActionButton = ({ onPressMainAction, onPressSecondaryAction, mainTitle, secondaryTitle, secondarySymbol }: MultiActionButtonProps) => (
    <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.appButtonTextContainer} accessibilityActions={[{name: "click", label: mainTitle}]} onPress={onPressMainAction}>
            <Text style={styles.appButtonText}>{mainTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityActions={[{ name: "click", label: secondaryTitle}]} 
            onPress={onPressSecondaryAction} style={styles.symbolContainer}>
            <FontAwesome5 name={secondarySymbol} size={24} color={AppStyle.multiActionSymbolColor} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        borderRadius: 10,
        backgroundColor: AppStyle.multiActionBackgroundColor,
        marginBottom: 15,
    },
    symbolContainer: {
        backgroundColor: AppStyle.multiActionSymbolButtonColor,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 15, 
        paddingVertical: 15, 
        borderLeftWidth: 1,
    },
    appButtonTextContainer: {
        flexGrow: 1,
        paddingHorizontal: 15, 
        paddingVertical: 15, 
    },
    appButtonText: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default MultiActionButton;
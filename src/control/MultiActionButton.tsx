import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppStyle } from "../../styles/default";
import { FontAwesome5 } from '@expo/vector-icons';

const MultiActionButton = ({ onPressMainAction, onPressSecondaryAction, mainTitle, secondaryTitle, secondarySymbol }) => (
    <View style={styles.buttonContainer} >
        <TouchableOpacity accessibilityActions={[{name: "click", label: mainTitle}]} onPress={onPressMainAction}>
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
    appButtonText: {
        width: 100,
        fontSize: 16,
        paddingHorizontal: 15, 
        paddingVertical: 15, 
        textAlign: 'center',
    }
});

export default MultiActionButton;
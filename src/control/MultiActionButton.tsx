import React from "react";
import { StyleSheet, View } from 'react-native';
import { AppStyle } from "../../styles/default";
import AppButton from "./AppButton";
import SymbolButton from "./SymbolButton";

const MultiActionButton = ({ onPressMainAction, onPressSecondaryAction, mainTitle, secondaryTitle, secondarySymbol }) => (
    <View style={styles.buttonContainer} >
        <AppButton onPress={onPressMainAction} title={mainTitle} />
        <SymbolButton onPress={onPressSecondaryAction} title={secondaryTitle} symbol={secondarySymbol} />
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 3,
        borderRadius: 3,
        backgroundColor: AppStyle.buttonBackground,
        paddingVertical: 6,
        paddingHorizontal: 8
    }
});

export default MultiActionButton;
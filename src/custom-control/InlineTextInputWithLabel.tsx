import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { AppColorStyles, AppFontStyles } from "../../styles/default";
import { InlineTextInputWithLabelProps } from "../../types/controls";

const InlineTextInputWithLabel = ({ label, value, onChangeText }: InlineTextInputWithLabelProps) => (
    <View style={styles.appButtonContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.content} value={value} onChangeText={onChangeText}/>
    </View>
);

const styles = StyleSheet.create({
    appButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        paddingVertical: 6,
    },
    label: {
        flex: 1,
        paddingLeft: 10,
        textAlign: 'left',
        color: AppColorStyles.buttonText,
        fontSize: AppFontStyles.detailSize,
        backgroundColor: AppColorStyles.buttonBackground,
        fontWeight: "bold",
    },
    content: {
        flex: 3,
        paddingLeft: 10,
        textAlign: 'left',
        backgroundColor: AppColorStyles.listItemBorderColor,
        color: AppColorStyles.headerText,
        fontSize: AppFontStyles.detailSize,
    },
});

export default InlineTextInputWithLabel;
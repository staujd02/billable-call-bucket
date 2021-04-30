import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from "../../styles/default";
import { DoubleTextLayoutProps } from "../../types/controls";

const DoubleTextLayout = ({ label, content }: DoubleTextLayoutProps) => (
    <View style={styles.appButtonContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.content}>{content}</Text>
    </View>
);

const styles = StyleSheet.create({
    appButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    label: {
        flex: 1,
        paddingRight: 5,
        textAlign: 'right',
        color: AppColorStyles.buttonText,
        fontSize: AppFontStyles.detailSize,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        paddingLeft: 5,
        textAlign: 'left',
        color: AppColorStyles.buttonText,
        fontSize: AppFontStyles.detailSize,
    },
});

export default DoubleTextLayout;
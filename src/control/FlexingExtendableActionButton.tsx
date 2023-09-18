import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColorStyles } from "../../styles/default";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FlexingExtendableActionButtonProps } from "../../types/controls";

const FlexingExtendableActionButton = ({ actions }: FlexingExtendableActionButtonProps) => (
    <View style={styles.buttonSiblingLayout}>
        {
            actions.map(action => (
                <TouchableOpacity style={{ ...styles.buttonLayout, backgroundColor: action.isSelected 
                            ? 'green'
                            : 'pink'  }} accessibilityActions={[{ name: "click", label: action.title }]} onPress={action.onPressAction}>
                    <Text key={action.title} style={{ ...styles.appButtonText, flex: action.layout}}>
                        {action.title}
                    </Text>
                </TouchableOpacity>
            ))
        }
    </View>
);

const styles = StyleSheet.create({
    buttonSiblingLayout: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: AppColorStyles.buttonBackground,
        borderRadius: 20,
        marginBottom: 15,
        marginTop: 15,
    },
    buttonLayout: {
        borderColor: AppColorStyles.listItemBorderColor,
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        flexShrink: 1,
    },
    appButtonText: {
        fontSize: 16,
        paddingLeft: 5,
        textAlign: 'center',
    }
});

export default FlexingExtendableActionButton;
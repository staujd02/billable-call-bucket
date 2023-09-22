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
                <TouchableOpacity style={{...styles.buttonLayout, ...(!action.isSelected ? {} : styles.buttonLayoutSelectedOverride)}}
                            accessibilityActions={[{ name: "click", label: action.title }]} onPress={action.onPressAction}>
                    <Text key={action.title} style={{ 
                        ...styles.appButtonText, 
                        flex: action.layout,
                        ...(action.isSelected ? styles.appButtonTextSelectedOverride : {})
                    }}>
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
        backgroundColor: AppColorStyles.buttonBackground,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonLayout: {
        borderColor: AppColorStyles.listItemBorderColor,
        backgroundColor: AppColorStyles.multiActionBackgroundColor,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
    },
    buttonLayoutSelectedOverride: {
        borderColor: AppColorStyles.listItemBorderColor,
        backgroundColor: AppColorStyles.multiActionSymbolButtonColor,
    },
    appButtonText: {
        fontSize: 18,
        paddingLeft: 5,
        textAlign: 'center',
    },
    appButtonTextSelectedOverride: {
        color: AppColorStyles.multiActionSymbolColor
    }
});

export default FlexingExtendableActionButton;
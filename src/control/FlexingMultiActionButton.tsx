import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColorStyles } from "../../styles/default";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FlexingMultiActionButtonProps } from "../../types/controls";

const FlexingMultiActionButton = ({ onPressMainAction, onPressSecondaryAction, titles, layout, secondaryTitle, secondarySymbol }: FlexingMultiActionButtonProps) => (
    <View style={styles.buttonSiblingLayout}>
        <TouchableOpacity style={styles.buttonLayout} accessibilityActions={[{ name: "click", label: "view call" }]} onPress={onPressMainAction}>
            {titles.map((v, key) => {
                let flex = layout[key];
                return (
                    <Text key={key} style={{ ...styles.appButtonText, flex }}>
                        {v}
                    </Text>
                )
            })}
        </TouchableOpacity>
        <TouchableOpacity accessibilityActions={[{ name: "click", label: secondaryTitle }]}
            onPress={onPressSecondaryAction} style={styles.symbolButton}>
            <FontAwesomeIcon icon={secondarySymbol} size={24} color={AppColorStyles.multiActionSymbolColor} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    buttonSiblingLayout: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: AppColorStyles.buttonBackground,
        borderTopLeftRadius: 20,
        marginBottom: 15,
    },
    symbolButton: {
        backgroundColor: AppColorStyles.multiActionSymbolButtonColor,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderLeftWidth: 1,
    },
    buttonLayout: {
        borderColor: AppColorStyles.listItemBorderColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 5,
        flexShrink: 1,
    },
    appButtonText: {
        fontSize: 16,
        paddingLeft: 5,
        textAlign: 'center',
    }
})

// const styles = StyleSheet.create({
//     buttonContainer: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         elevation: 3,
//         borderRadius: 10,
//         marginBottom: 15,
//         marginRight: 5,
//     },
//     symbolContainer: {
//         backgroundColor: AppColorStyles.multiActionSymbolButtonColor,
//         borderTopRightRadius: 8,
//         borderBottomRightRadius: 8,
//         paddingHorizontal: 15,
//         paddingVertical: 15,
//         borderLeftWidth: 1,
//     },
//     flexAppButtonText: {
//         flex: 1,
//         textAlign: 'center',
//         color: AppColorStyles.buttonText,
//         backgroundColor: AppColorStyles.buttonBackground,
//         fontSize: 16,
//         fontWeight: "bold",
//         alignSelf: "center",
//         borderTopLeftRadius: 20,
//         borderStyle: 'solid',
//         // borderLeftWidth: 3,
//         // borderTopWidth: 3,
//         // borderBottomWidth: 3,
//         // borderColor: AppColorStyles.listItemBorderColor,
//     },
//     flexAppButtonContainer: {
//         // elevation: 3,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         backgroundColor: AppColorStyles.buttonBackground,
//         borderRadius: 10,
//         borderTopRightRadius: 5,
//         paddingLeft: 10,
//     },
// });

export default FlexingMultiActionButton;
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles } from "../../styles/default";
import { SelectableListItemProps } from "../../types/controls";

const SelectableListItem = ({ onPress, titles, flexLayout }: SelectableListItemProps) => (
    <View style={styles.spacing} >
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            {titles.map((v, key) => {
                let flex = flexLayout[key];
                return <Text key={key} style={{ ...styles.appButtonText, flex}}>{v}</Text>
            })}
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    spacing: {
        paddingTop: 3,
        paddingBottom: 3
    },
    appButtonContainer: {
        elevation: 3,
        backgroundColor: AppColorStyles.buttonBackground,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderStyle: 'solid',
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 3,
        borderColor: AppColorStyles.listItemBorderColor,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    appButtonText: {
        flex: 1,
        textAlign: 'center',
        color: AppColorStyles.buttonText,
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
    },
});

export default SelectableListItem;
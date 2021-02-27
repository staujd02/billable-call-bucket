import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import { AppStyle } from "../../styles/default";

const SelectableListItem = ({ onPress, title }) => (
    <View style={styles.spacing} >
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
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
        backgroundColor: AppStyle.buttonBackground,
        borderStyle: 'solid',
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 3,
        borderColor: AppStyle.listItemBorderColor,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    appButtonText: {
        color: AppStyle.buttonText,
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default SelectableListItem;
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { AppStyle } from "../../styles/default";
import { SearchBoxProps } from "../../types/controls";

const SearchBox = ({ value, onChangeText }: SearchBoxProps) => {
    return (
        <TextInput 
            placeholder="Search" 
            placeholderTextColor={AppStyle.searchPlaceholderTextColor} 
            style={styles.searchTextContainer} 
            value={value} 
            onChangeText={onChangeText} />
    );
}

const styles = StyleSheet.create({
    searchTextContainer: {
        backgroundColor: AppStyle.searchBackgroundColor,
        color: AppStyle.searchTextColor,
        borderRadius: 15,
        borderWidth: 2,
        paddingHorizontal: 5, 
        paddingVertical: 5, 
        fontSize: 16,
        width: 250,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default SearchBox;
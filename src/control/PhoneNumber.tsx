import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type PhoneNumberProps = {
    number: string,
    onChange: (num: string) => void,
    style: TextStyle
}

export const PhoneNumber = ({
    number,
    onChange,
    style
}: PhoneNumberProps) => {

    const defaultFormat = "55555555555";
    const numberToFormat = number.length === 0 ? defaultFormat : number; 
    const formattedAppearance = format(numberToFormat);

    const onChangeText = (text: string): void => {
        const wasAddition = text.length > formattedAppearance.length;
        const addition = text.slice(formattedAppearance.length - text.length);
        const validAddition = !Number.isNaN(parseInt(addition || ""));
        const moreDigitsLeft = number.length < defaultFormat.length;
        if (wasAddition && validAddition && moreDigitsLeft)
            onChange(number + addition);
        else if (text.length <= formattedAppearance.length)
            onChange(number.slice(0, number.length - 1));
    };
    return (
        <TextInput
            style={{ ...style, color: number.length === 0 ? 'grey' : style.color}}
            keyboardType="numeric"
            value={formattedAppearance}
            onChangeText={onChangeText}
        />
    );
}

function format(numberToFormat: string) {
    if(numberToFormat.length <= 7)
        return `${numberToFormat.slice(0, 3)}-${numberToFormat.slice(3, 7)}`;
    if(numberToFormat.length <= 10)
        return `(${numberToFormat.slice(0, 3)}) ${numberToFormat.slice(3, 6)}-${numberToFormat.slice(6, 10)}`;
    return `${numberToFormat.slice(0, 1)} (${numberToFormat.slice(1, 4)}) ${numberToFormat.slice(4, 7)}-${numberToFormat.slice(7, 11)}`;
}

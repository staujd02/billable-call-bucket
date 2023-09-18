import { TextInput } from "react-native-gesture-handler";

type PhoneNumberProps = {
    number: string,
    onChange: (num: string) => void,
    style: Object
}

export const PhoneNumber = ({
    number,
    onChange,
    style
}: PhoneNumberProps) => {
    return (
        <TextInput
            style={style}
            keyboardType="numeric"
            value={number.toString()}
            onChange={(text) => {
                onChange(text.target.toString());
            }}
        />
    );
}
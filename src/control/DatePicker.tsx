import DatePicker from "react-native-date-picker";

type SelectDatePickerProps = {
    open: boolean
    date: Date,
    onConfirm: (date: Date) => void,
    onCancel: () => void,
}

export const SelectDatePicker = ({
    open,
    date,
    onConfirm,
    onCancel
}: SelectDatePickerProps) => {
    return (
        <DatePicker
            modal
            mode="datetime"
            open={open}
            date={date}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
}
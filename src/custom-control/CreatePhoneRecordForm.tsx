import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PhoneNumber } from "../control/PhoneNumber";
import { AppColorStyles, AppFontStyles } from "../../styles/default";
import FlexingExtendableActionButton from '../control/FlexingExtendableActionButton';
import { SelectDatePicker } from '../control/DatePicker';
import { useState } from "react";

export type CreatePhoneRecordFormProps = {
    date: number,
    duration: number
    number: string,
    incoming: boolean,
    setDate: (d: number) => void
    setDuration: (d: number) => void
    setNumber: (n: string) => void
    setIncoming: (i: boolean) => void
}

export const CreatePhoneRecordForm = ({
    date,
    duration,
    number,
    incoming,
    setDate,
    setDuration,
    setNumber,
    setIncoming
}: CreatePhoneRecordFormProps) => {
  
   const [dateOpen, setDateOpen] = useState(false);
  
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString();

    const isFifteenMinuteDefault = duration === 15 * 60;
    const isThirtyMinuteDefault = duration === 30 * 60;
    const isFortyFiveMinuteDefault = duration === 45 * 60;
    const isCustomDuration = !isFifteenMinuteDefault && !isThirtyMinuteDefault && !isFortyFiveMinuteDefault;

    return (
        <View style={styles.callDetails}>
          <Text style={styles.label}>Number:</Text>
          <PhoneNumber 
            number={number} 
            style={{ ...styles.entry, marginBottom: 10 }} 
            onChange={num => setNumber(num)}
          />
          <Text style={styles.label}>When:</Text>
          <TouchableOpacity onPress={() => setDateOpen(true)} style={styles.dateEntry}>
            <Text style={styles.dateEntryLabel}>{formattedDate}</Text>
          </TouchableOpacity>
          <SelectDatePicker 
            date={new Date(date)} 
            onCancel={() => { setDateOpen(false); }}
            onConfirm={(date) => { setDate(date.valueOf()); setDateOpen(false); }}
            open={dateOpen}
          />
          <Text style={{...styles.label, marginTop: 20 }}>Duration (in minutes):</Text>
          <FlexingExtendableActionButton
              actions={[
                {
                  layout: 1,
                  onPressAction: () => setDuration(15 * 60),
                  title: "15",
                  isSelected: isFifteenMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(30 * 60),
                  title: "30",
                  isSelected: isThirtyMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(45 * 60),
                  title: "45",
                  isSelected: isFortyFiveMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(60 * 60),
                  title: "Custom",
                  isSelected: isCustomDuration
                }
              ]}/>
          <Text style={styles.label}>Phone Call Direction:</Text>
          <FlexingExtendableActionButton
              actions={[
                {
                  layout: 1,
                  onPressAction: () => setIncoming(true),
                  title: "Incoming",
                  isSelected: incoming
                },
                {
                  layout: 1,
                  onPressAction: () => setIncoming(false),
                  title: "Outgoing",
                  isSelected: !incoming
                }
              ]}/>
        </View>
    )
}

const styles = StyleSheet.create({
  entry: {
    fontSize: AppFontStyles.detailSize,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  dateEntry: {
    elevation: 3,
    backgroundColor: AppColorStyles.buttonBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderStyle: 'solid',
    borderRightRadius: 10,
    borderWidth: 3,
    borderColor: AppColorStyles.listItemBorderColor,
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  dateEntryLabel: {
    fontSize: 24,
    paddingLeft: 15,
    paddingRight: 15
  },
  label: {
    color: AppColorStyles.text,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
  callDetails: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
});
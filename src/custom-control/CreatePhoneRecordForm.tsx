import FlexingExtendableActionButton from '../control/FlexingExtendableActionButton';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PhoneNumber } from "../control/PhoneNumber";
import { AppColorStyles, AppFontStyles } from "../../styles/default";
import { SelectDatePicker } from '../control/DatePicker';
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export type CreatePhoneRecordFormProps = {
    date: number,
    duration: number
    number: string,
    incoming: boolean,
    name: string,
    setDate: (d: number) => void
    setDuration: (d: number) => void
    setNumber: (n: string) => void
    setIncoming: (i: boolean) => void
}

export const CreatePhoneRecordForm = ({
    date,
    duration,
    name,
    number,
    incoming,
    setDate,
    setDuration,
    setNumber,
    setIncoming
}: CreatePhoneRecordFormProps) => {
  
    const [dateOpen, setDateOpen] = useState(false);
    const [isCustom, setIsCustom] = useState(false);

    const onPressHandler = (value: number) => () => {
      setDuration(value * 60);
      setIsCustom(false);
    }
  
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString();

    const isFifteenMinuteDefault = duration === 15 * 60;
    const isThirtyMinuteDefault = duration === 30 * 60;
    const isFortyFiveMinuteDefault = duration === 45 * 60;

    return (
        <View style={styles.callDetails}>
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
          <Text style={{...styles.label, marginTop: 20 }}>Billed Duration (in minutes):</Text>
          <FlexingExtendableActionButton
              actions={[
                {
                  layout: 1,
                  onPressAction: onPressHandler(15),
                  title: "15",
                  isSelected: isFifteenMinuteDefault && !isCustom
                },
                {
                  layout: 1,
                  onPressAction: onPressHandler(30),
                  title: "30",
                  isSelected: isThirtyMinuteDefault && !isCustom
                },
                {
                  layout: 1,
                  onPressAction: onPressHandler(45),
                  title: "45",
                  isSelected: isFortyFiveMinuteDefault && !isCustom
                },
                {
                  layout: 1,
                  onPressAction: () => setIsCustom(true),
                  title: "Custom",
                  isSelected: isCustom
                }
              ]}/>
          {isCustom && <TextInput 
            style={styles.durationEntry}
            keyboardType="numeric" 
            value={duration !== 0 ? (duration / 60).toString() : ""} 
            onChangeText={(t) => !Number.isNaN(parseInt(t)) 
                ? setDuration(parseInt(t) * 60) 
                : setDuration(0)} />}
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
            <Text style={{ ...styles.label, marginBottom: 0 }}>Number (Optional):</Text>
            <PhoneNumber 
              number={number} 
              style={{ ...styles.entry, textAlign: 'center', marginBottom: 10 }} 
              onChange={num => setNumber(num)}
            />
            <Text style={styles.contactLabel}>Matching Contact: {name}</Text>
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
  durationEntry: {
    backgroundColor: AppColorStyles.buttonBackground,
    borderColor: AppColorStyles.listItemBorderColor,
    elevation: 3,
    textAlign: "center",
    borderWidth: 3,
    marginBottom: 10,
    fontSize: 18,
    paddingLeft: 32,
    paddingRight: 32,
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
    fontSize: 18,
  },
  callDetails: {
    // display: 'flex',
    overflow: 'scroll',
    // flexDirection: "column",
    // justifyContent: 'space-between',
    // alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  contactLabel: {
    color: "grey"
  }
});
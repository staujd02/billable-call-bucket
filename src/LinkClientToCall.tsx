import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { CallLog } from '../types/calls';
import { LinkClientToCallProps } from '../types/routes';
import MultiActionButton from './control/MultiActionButton';
import SearchBox from './control/SearchBox';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import InlineTextInputWithLabel from './custom-control/InlineTextInputWithLabel';
import useCalls from './hooks/useCalls';
import useClients from './hooks/useClients';
import useContacts from './hooks/useContacts';
import { formatContact, formatHoursMinutesSeconds, formatPhoneNumber, formatTimestamp } from './service/formatter';

const LinkClientToCall = (props: LinkClientToCallProps) => {

  const { navigation, route } = props;
  const { phoneNumber, duration, timestamp, type }: CallLog = route.params.callLog;

  const { loadContactByNumber, loadedContact } = useContacts();
  const { clients, loadClients, searchClients } = useClients();
  const { addBillableCall } = useCalls();

  const title = loadedContact !== null
    ? formatContact(loadedContact)
    : formatPhoneNumber(phoneNumber);

  const [searchValue, setSearchValue] = useState("");
  const [loadCount, setLoadCount] = useState(10);
  const [callReason, setCallNotes] = useState("");
  const [contactNotes, setContactNotes] = useState("");

  useEffect(() => {
    loadContactByNumber(phoneNumber)
  }, []);

  useEffect(() => {
    if (loadedContact !== null && contactNotes === "")
      setContactNotes(formatContact(loadedContact))
  }, [loadedContact])

  useEffect(() => {
    searchValue
      ? searchClients(searchValue, loadCount)
      : loadClients(loadCount);
  }, [searchValue, loadCount]);

  const onGoToDraftBill = async (clientId: string) => {
    await addBillableCall({
      callReason,
      contactNotes,
      clientPk: clientId,
      phoneNumber,
      duration,
      timestamp,
      type,
    });
    navigation.navigate('DraftBill', { clientId });
  }
  const onGoToClientDetail = (clientId: string) =>
    navigation.push('ClientDetail', { clientId });

  const formattedDuration = formatHoursMinutesSeconds(duration);
  const formattedStamp = formatTimestamp(timestamp);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Call Details</Text>
      <DoubleTextLayout label="Contact:" content={title} />
      <DoubleTextLayout label="When:" content={formattedStamp} />
      <DoubleTextLayout label="Duration:" content={formattedDuration} />
      <DoubleTextLayout label="Call Direction:" content={type} />
      <InlineTextInputWithLabel
        label="Contact Notes:"
        onChangeText={s => setContactNotes(s)}
        value={contactNotes} />
      <InlineTextInputWithLabel
        label="Call Notes:"
        onChangeText={s => setCallNotes(s)}
        value={callReason} />
      <Text style={styles.header}>Clients</Text>
      <SearchBox value={searchValue} onChangeText={text => setSearchValue(text)} />
      <FlatList
        style={styles.list}
        data={clients}
        keyExtractor={c => c.pk.toString()}
        renderItem={
          ({ item }) => (
            <MultiActionButton
              mainTitle={item.name}
              onPressMainAction={() => onGoToClientDetail(item.pk.toString())}
              onPressSecondaryAction={() => onGoToDraftBill(item.pk.toString())}
              secondaryTitle={"bill " + item.name}
              secondarySymbol='money-bill' />
          )
        }
      />
    </View>
  );
};

export default LinkClientToCall;

const styles = StyleSheet.create({
  topHeader: {
    color: AppColorStyles.text,
    textAlign: 'left',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  detail: {
    color: AppColorStyles.detailText,
    fontSize: AppFontStyles.detailSize,
    textAlign: 'left',
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  list: {}
});
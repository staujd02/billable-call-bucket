import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { CallLog } from '../types/calls';
import { LinkClientToCallProps } from '../types/routes';
import MultiActionButton from './control/MultiActionButton';
import SearchBox from './control/SearchBox';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import useClients from './hooks/useClients';
import useContacts from './hooks/useContacts';
import { formatContact, formatHoursMinutesSeconds, formatPhoneNumber, formatTimestamp } from './service/formatter';

const LinkClientToCall = (props: LinkClientToCallProps) => {

  const { navigation, route } = props;
  const { phoneNumber, duration, timestamp, type }: CallLog = route.params.callLog;

  const { loadContactByNumber, loadedContact } = useContacts();

  const { clients, loadClients, searchClients } = useClients();

  const onGoToDraftBill = () => navigation.navigate('DraftBill');
  const onGoToClientDetail = () => navigation.push('ClientDetail');

  const formattedDuration = formatHoursMinutesSeconds(duration);
  const formattedStamp = formatTimestamp(timestamp);

  const title = loadedContact !== null
    ? formatContact(loadedContact)
    : formatPhoneNumber(phoneNumber);

  const [searchValue, setSearchValue] = useState("");
  const [loadCount, setLoadCount] = useState(10);

  useEffect(() => {
    loadContactByNumber(phoneNumber)
  }, []);

  useEffect(() => {
    searchValue
      ? searchClients(searchValue, loadCount)
      : loadClients(loadCount);
  }, [searchValue, loadCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Call Details</Text>
      <DoubleTextLayout label="Contact:" content={title} />
      <DoubleTextLayout label="When:" content={formattedStamp} />
      <DoubleTextLayout label="Duration:" content={formattedDuration} />
      <DoubleTextLayout label="Call Direction:" content={type} />
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
              onPressMainAction={onGoToClientDetail}
              onPressSecondaryAction={onGoToDraftBill}
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
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Contact } from 'react-native-contacts';
import { AppStyle } from '../styles/default';
import { CallLog } from '../types/calls';
import { LinkClientToCallProps } from '../types/routes';
import MultiActionButton from './control/MultiActionButton';
import SearchBox from './control/SearchBox';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import useContacts from './hooks/useContacts';
import { formatContact, formatHoursMinutesSeconds, formatPhoneNumber, formatTimestamp } from './service/formatter';

const LinkClientToCall = (props: LinkClientToCallProps) => {

  const { navigation, route } = props;
  const { phoneNumber, duration, timestamp, type }: CallLog = route.params.callLog;

  const { loadContactByNumber, loadedContact } = useContacts();

  const onGoToDraftBill = () => navigation.navigate('DraftBill');
  const onGoToClientDetail = () => navigation.push('ClientDetail');

  const formattedDuration = formatHoursMinutesSeconds(duration);
  const formattedStamp = formatTimestamp(timestamp);

  useEffect(() => {
    loadContactByNumber(phoneNumber)
  }, []);

  const title = loadedContact !== null
    ? formatContact(loadedContact)
    : formatPhoneNumber(phoneNumber);

  const [searchValue, setSearchValue] = useState("");
  // load with this:
  // https://rnmmkv.now.sh/#/asyncapi
  const data = [
    { key: 'Dave' },
    { key: 'Joaniz' },
    { key: 'Sarah' },
    { key: 'Meradith' },
    { key: 'Keith' },
    { key: 'Keith1' },
    { key: 'Keith2' },
    { key: 'Keith3' },
    { key: 'Keith4' },
    { key: 'Keith5' },
  ];


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
        data={data.filter(d => !searchValue || d.key.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))}
        renderItem={
          ({ item }) => (
            <MultiActionButton
              mainTitle={item.key}
              onPressMainAction={onGoToClientDetail}
              onPressSecondaryAction={onGoToDraftBill}
              secondaryTitle={"bill " + item.key}
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
    color: AppStyle.text,
    textAlign: 'left',
    fontSize: AppStyle.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    color: AppStyle.text,
    textAlign: 'center',
    fontSize: AppStyle.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  detail: {
    color: AppStyle.detailText,
    fontSize: AppStyle.detailSize,
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
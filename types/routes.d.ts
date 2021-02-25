import { StackScreenProps } from '@react-navigation/stack';
import Routes from 'src/constants/routes';

export type RootStackParamList = {
  Home: undefined;
  DraftBill: undefined;
  CallLinkedToClient: undefined;
  EditLinkedCall: undefined;
  DraftBillsByClient: undefined;
  BillingHistoryByClient: undefined;
  ClientBillingHistory: undefined;
  EditClient: undefined;
  AddNewClient: undefined;
  Bill: undefined;
  ClientDetail: undefined;
  ClientList: undefined;
  LinkClientToCall: undefined;
};

type DraftBillProps = StackScreenProps<RootStackParamList, 'DraftBill'>;
type CallLinkedToClientProps = StackScreenProps<RootStackParamList, 'CallLinkedToClient'>;
type EditLinkedCallProps = StackScreenProps<RootStackParamList, 'EditLinkedCall'>;
type DraftBillsByClientProps = StackScreenProps<RootStackParamList, 'DraftBillsByClient'>;
type BillingHistoryByClientProps = StackScreenProps<RootStackParamList, 'BillingHistoryByClient'>;
type ClientBillingHistoryProps = StackScreenProps<RootStackParamList, 'ClientBillingHistory'>;
type EditClientProps = StackScreenProps<RootStackParamList, 'EditClient'>;
type AddNewClientProps = StackScreenProps<RootStackParamList, 'AddNewClient'>;
type BillProps = StackScreenProps<RootStackParamList, 'Bill'>;
type ClientDetailProps = StackScreenProps<RootStackParamList, 'ClientDetail'>;
type ClientListProps = StackScreenProps<RootStackParamList, 'ClientList'>;
type LinkClientToCallProps = StackScreenProps<RootStackParamList, 'LinkClientToCall'>;
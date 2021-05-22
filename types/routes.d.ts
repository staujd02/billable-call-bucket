import { StackScreenProps } from '@react-navigation/stack';
import Routes from 'src/constants/routes';

type ClientNameWithCallId = {
  callId: string,
  clientName: string,
}

type ClientNameWithCallIdAndReadPermission = {
  callId: string,
  clientName: string,
  readOnly: boolean,
}

type ClientNameWithBillId = {
  billId: string,
  clientName: string,
}

type ClientIdRoute = {
  clientId: string,
}

type BillIdRoute = {
  billId: string,
}

export type RootStackParamList = {
  Home: undefined;
  DraftBill: ClientIdRoute;
  CallLinkedToClient: ClientNameWithCallIdAndReadPermission;
  EditLinkedCall: ClientNameWithCallId;
  DraftBillsByClient: undefined;
  BillingHistoryByClient: undefined;
  ClientBillingHistory: ClientIdRoute;
  EditClient: ClientIdRoute;
  AddNewClient: undefined;
  Bill: ClientNameWithBillId;
  ClientDetail: ClientIdRoute;
  ClientList: undefined;
  LinkClientToCall: CallLog;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;
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
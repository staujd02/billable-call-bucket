import { StackScreenProps } from '@react-navigation/stack';
import { CallLog } from './calls';

type ClientNameWithCallId = {
  callId: string,
  clientName: string,
}

type ClientNameWithCallIdAndReadPermission = {
  callId: string,
  clientName: string,
  readOnly: boolean,
}

type ClientIdWithBillId = {
  billId: string,
  clientId: string,
}

type ClientIdRoute = {
  clientId: string,
}

type BillIdRoute = {
  billId: string,
}

export type RootStackParamList = {
  ComplianceTestLogin: undefined;
  TermsAndConditions: undefined;
  FirstTimeUser: undefined;
  LandingPage: undefined;
  HomeScreen: undefined;
  DraftBill: ClientIdRoute;
  CallLinkedToClient: ClientNameWithCallIdAndReadPermission;
  EditLinkedCall: ClientNameWithCallId;
  DraftBillsByClient: undefined;
  BillingHistoryByClient: undefined;
  ClientBillingHistory: ClientIdRoute;
  EditClient: ClientIdRoute;
  AddNewClient: undefined;
  Bill: ClientIdWithBillId;
  ClientDetail: ClientIdRoute;
  ClientList: undefined;
  LinkClientToCall: CallLog;
};

type ComplianceTestLoginProps = StackScreenProps<RootStackParamList, 'ComplianceTestLogin'>;
type TermsAndConditionsProps = StackScreenProps<RootStackParamList, 'TermsAndConditions'>;
type LandingPageProps = StackScreenProps<RootStackParamList, 'LandingPage'>;
type FirstTimeUserProps = StackScreenProps<RootStackParamList, 'FirstTimeUser'>;
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
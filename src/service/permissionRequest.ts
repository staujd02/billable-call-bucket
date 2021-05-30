import { PermissionsAndroid } from 'react-native';

async function requestCallLogPermission(): Promise<boolean> {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
                title: 'Allow App To Access Call Logs',
                message: "This app needs access to your call logs to link recent calls.",
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
        return false;
    }
}

async function requestContactPermission(): Promise<boolean> {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Allow App Access to Contacts',
                message: "This app needs access to your contacts to link names with numbers.",
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
        return false;
    }
}

async function requestFileWritePermission(): Promise<boolean> {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Allow App Access to Contacts',
                message: "This app needs access to your contacts to link names with numbers.",
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
        return false;
    }
}

export {
    requestContactPermission,
    requestCallLogPermission,
    requestFileWritePermission,
};
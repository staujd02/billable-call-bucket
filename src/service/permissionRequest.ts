import * as Permissions from 'expo-permissions';
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

async function requestContactPermission(): Promise<boolean> {
    try {
        console.log("Asked");
        const { status } = await Permissions.getAsync(
            Permissions.CONTACTS,
        );
        if (status === "undetermined") {
            const { status } = await Permissions.askAsync(
                Permissions.CONTACTS,
            );
            return status === 'granted';
        }
        return status === 'granted';
    } catch (error) {
        console.error(error);
        return false;
    }
}

export {
    requestContactPermission,
    requestCallLogPermission
};
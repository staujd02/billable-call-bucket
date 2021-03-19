import * as Permissions from 'expo-permissions';

async function requestCallLogPermission(): Promise<boolean> {
    try {
        const customPermission: any = "READ_CALL_LOG";
        const { status } = await Permissions.getAsync(customPermission);
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
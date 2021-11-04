import { Legal, LegalInfo } from "../../types/calls";
import { LegalSchemaName } from "../models/Legal";
import usePersistentStorage from "./usePersistentStorage";

const legalKey = 1;

type MaybeLegal = Legal | undefined;

const useRegistration = () => {

    const { getRealm } = usePersistentStorage();

    const getRegistrationState = async (): Promise<MaybeLegal> => {
        const realm = (await getRealm());
        return await new Promise<MaybeLegal>(async (resolve, reject) => {
            realm.write(() => {
                const legal = realm.objectForPrimaryKey<MaybeLegal>(LegalSchemaName, legalKey);
                resolve(legal);
            })
        });
    }

    const createRegistrationState = async (register: LegalInfo): Promise<void> => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                realm.create<Legal>(LegalSchemaName, {
                    ...register,
                    pk: legalKey,
                });
                resolve();
            })
        });
    }

    const completeRegistrationState = async (): Promise<void> => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const legal = realm.objectForPrimaryKey<MaybeLegal>(LegalSchemaName, legalKey);
                if (legal)
                    legal.emailVerified = true;
                resolve();
            })
        });
    }

    const indicateEmailVerificationWasSent = async (): Promise<void> => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const legal = realm.objectForPrimaryKey<MaybeLegal>(LegalSchemaName, legalKey);
                if (legal)
                    legal.emailVerificationSent = true;
                resolve();
            })
        });
    }

    return {
        getRegistrationState,
        createRegistrationState,
        completeRegistrationState,
        indicateEmailVerificationWasSent,
    }
}

export default useRegistration;
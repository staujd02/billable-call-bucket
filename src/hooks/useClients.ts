import { Guid } from "guid-typescript";
import { useState } from "react";
import { Bill, Client, NewClient, UpdateClient } from "../../types/calls";
import { ClientSchemaName } from "../models/Client";
import { enumerate } from "../utility/enumerate";
import usePersistentStorage from "./usePersistentStorage";

const useClients = () => {

    const [clients, setClients] = useState<Array<Client>>();

    const { getRealm } = usePersistentStorage();

    const loadClients = async (count: number) => {
        const result = (await getRealm())
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .values();
        setClients(
            enumerate<Client>(result, count)
        );
    }

    const addClient = async (client: NewClient) => {
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const pk = Guid.create().toString();
                const addedClient = {
                    pk,
                    bills: [],
                    ...client,
                };
                realm.create(ClientSchemaName, addedClient);
                resolve();
            })
        });
    }

    const updateClient = async (client: UpdateClient) => {
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const dbClient = realm.objectForPrimaryKey<Client>(ClientSchemaName, client.pk);
                dbClient.name = client.name;
                dbClient.description = client.description;
                resolve();
            })
        });
    }

    const getClient = async (clientGuid: string): Promise<Client> => {
        const realm = (await getRealm());
        return await new Promise<Client>(async (resolve, reject) => {
            realm.write(() => {
                const client = realm.objectForPrimaryKey<Client>(ClientSchemaName, clientGuid.toString());
                resolve(client);
            })
        });
    }

    const deleteClient = async (clientId: string): Promise<void> => {
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const client = realm.objectForPrimaryKey<Client>(ClientSchemaName, clientId);
                realm.delete(client);
                resolve();
            })
        });
    }

    const searchClients = async (search: string, count: number) => {
        const result = (await getRealm())
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .filter(f => f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            .values();
        setClients(
            enumerate<Client>(result, count)
        );
    }

    const searchClientsWithOpenBills = async (search: string, count: number) =>
        await searchBills(getRealm, search, setClients, count, b => b.finalizedOn === null);

    const searchClientsWithFinalizedBills = async (search: string, count: number) =>
        await searchBills(getRealm, search, setClients, count, b => b.finalizedOn !== null);

    async function searchBills(
        getRealm: () => Promise<Realm>,
        search: string,
        setClients,
        count: number,
        billSearch: (b: Bill) => boolean
    ) {
        const result = (await getRealm())
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .filter(f => f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                && f.bills.some(billSearch)
            ).values();
        setClients(
            enumerate<Client>(result, count)
        );
    }

    const loadClientsWithOpenBills = async (count: number): Promise<void> =>
        await loadClientsWithBills(getRealm, setClients, count, b => b.finalizedOn === null);

    const loadClientsWithFinalizedBills = async (count: number): Promise<void> =>
        await loadClientsWithBills(getRealm, setClients, count, b => b.finalizedOn !== null);

    async function loadClientsWithBills(
        getRealm: () => Promise<Realm>,
        setClients,
        count: number,
        billSearch: (b: Bill) => boolean
    ) {
        const result = (await getRealm())
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .filter(f => f.bills.some(billSearch))
            .values();
        setClients(
            enumerate<Client>(result, count)
        );
    }

    return {
        clients,
        addClient,
        getClient,
        loadClients,
        deleteClient,
        updateClient,
        searchClients,
        loadClientsWithOpenBills,
        searchClientsWithOpenBills,
        loadClientsWithFinalizedBills,
        searchClientsWithFinalizedBills,
    }
}

export default useClients;
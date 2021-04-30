import { useState } from "react";
import { Client } from "../../types/calls";
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

    const addClient = async (client: Client) => {
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                realm.create(ClientSchemaName, client)
                setClients([...clients].concat([client]))
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

    return {
        clients,
        loadClients,
        searchClients,
        addClient,
    }
}

export default useClients;
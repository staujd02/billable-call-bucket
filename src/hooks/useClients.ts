import { useState } from "react";
import { Client } from "../../types/calls";
import { ClientSchemaName } from "../models/Client";
import usePersistentStorage from "./usePersistentStorage";

const useClients = () => {

    const [clients, setClients] = useState<Array<Client>>();

    const { realm, enumerate } = usePersistentStorage();

    const loadClients = (count: number) => {
        const result = realm
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .values();
        setClients(
            enumerate<Client>(result, count)
        );
        realm.close();
    }
    
    const searchClients = (search: string, count: number) => {
        const result = realm
            .objects<Client>(ClientSchemaName)
            .sorted('name')
            .filter(f => f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            .values();
        setClients(
            enumerate<Client>(result, count)
        );
        realm.close();
    }

    return {
        clients,
        loadClients,
        searchClients,
    }
}

export default useClients;
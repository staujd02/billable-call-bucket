import { useState, useEffect, useCallback } from "react";
import ShareMenu from "react-native-share-menu";
import { ShareCallback, ShareData } from "react-native-share-menu"; 

export type SharedContent = {
    text: string | string[]
    extraData: object | undefined
};

const useShare = (): SharedContent | null => {

    const [extraData, setExtraData] = useState<object | undefined>([]);
    const [sharedData, setSharedData] = useState<string | string[]>([]);
    const [sharedMimeType, setSharedMimeType] = useState<string | null>(null);

    const handleShare: ShareCallback = useCallback((item: ShareData | undefined) => {
        if (item) {
            const { mimeType, data, extraData } = item;
            setSharedData(data);
            setSharedMimeType(mimeType);
            setExtraData(extraData);
        }
    }, []);

    useEffect(() => {
        ShareMenu.getInitialShare(handleShare);
    }, []);

    useEffect(() => {
        const listener = ShareMenu.addNewShareListener(handleShare);
        return () => {
            listener.remove();
        };
    }, []);

    if (sharedMimeType === "text/plain" && sharedData)
        return {
            text: sharedData,
            extraData
        };
    return null;
};

export default useShare;
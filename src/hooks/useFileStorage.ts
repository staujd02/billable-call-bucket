import RNFetchBlob from "rn-fetch-blob"

const useFileStorage = () => {

    const timeString = (): string => {
        const theTime = new Date();
        return `${theTime.getMonth()}-${theTime.getDay()}-${theTime.getFullYear()}`;
    };
    const generateFileName = (): string => `export-bill-${timeString()}.csv`;
    const getPath = () => {
        // const rootFolder = "exported-bills";
        let dirs = RNFetchBlob.fs.dirs;
        return `${dirs.DownloadDir}/${generateFileName()}`;
    }

    const saveFile = async (lines: Generator<string, void, unknown>) => {
        console.log(getPath());
        const stream = await RNFetchBlob.fs.writeStream(getPath(), 'utf8')
        for (const line of lines)
            stream.write(line);
        stream.close();
    };

    return {
        saveFile
    }
}

export default useFileStorage;
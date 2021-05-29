import RNFetchBlob from "rn-fetch-blob"

const useFileStorage = () => {

    const timeString = () => (new Date()).toLocaleDateString().replaceAll('/', '-');
    const generateFileName = () => `export-bill-${timeString}.csv`;
    const getPath = () => {
        const rootFolder = "exported-bills";
        let dirs = RNFetchBlob.fs.dirs;
        return `${dirs.DocumentDir}/${rootFolder}/${generateFileName()}`;
    }

    const saveFile = async (lines: Generator<string, void, unknown>) => {
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
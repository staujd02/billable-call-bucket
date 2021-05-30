import RNFetchBlob from "rn-fetch-blob"

const useFileStorage = () => {

    const timeString = (): string => {
        const theTime = new Date();
        return `${theTime.getMonth()}-${theTime.getDay()}-${theTime.getFullYear()}`;
    };
    const generateFileName = (): string => `export-bill-${timeString()}.csv`;
    const getPath = () => {
        let dirs = RNFetchBlob.fs.dirs;
        return `${dirs.DownloadDir}/${generateFileName()}`;
    }

    const saveFile = async (lines: AsyncGenerator<string, void, unknown>) => {
        console.log(getPath());
        const stream = await RNFetchBlob.fs.writeStream(getPath(), 'utf8')
        while (true) {
            const generatedLine = await lines.next();
            if (!generatedLine.value)
                break;
            stream.write(generatedLine.value);
        }
        stream.close();
    };

    return {
        saveFile
    }
}

export default useFileStorage;
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppColorStyles } from '../../styles/default';
import AppButton from './AppButton';

const ExportButton = ({ exportProcess, exportTitle }: ExportButtonProps) => {

    const [exportInProgress, setExportInProgress] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const getTitle = () => exportInProgress ? "Exporting..." : exportTitle;
    const exportOpenBills = async () => {
        setExportInProgress(true);
        await exportProcess();
        setExportInProgress(false);
        setExportComplete(true);
    }

    return (
        <>
            {!exportComplete && <AppButton onPress={exportOpenBills} title={getTitle()} />}
            {exportComplete && <Text style={styles.exportText}>Export Finished: Check your downloads folder</Text>}
        </>
    )
}

const styles = StyleSheet.create({
  exportText: {
    padding: 15,
    color: AppColorStyles.headerText,
    backgroundColor: AppColorStyles.headerBackground,
  },
});

type ExportButtonProps = {
    exportProcess: () => Promise<void>
    exportTitle: string
}

export default ExportButton;
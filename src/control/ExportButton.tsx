import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppColorStyles } from '../../styles/default';
import AppButton from './AppButton';

const ExportButton = ({ exportProcess, exportTitle, exportMessage }: ExportButtonProps) => {

    const [exportInProgress, setExportInProgress] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const getTitle = () => exportInProgress ? "Exporting..." : exportTitle;
    const runExport = async () => {
        setExportInProgress(true);
        await exportProcess();
        setExportInProgress(false);
        setExportComplete(true);
    }

    return (
        <>
            {!exportComplete && <AppButton onPress={runExport} title={getTitle()} />}
            {exportComplete && <Text style={styles.exportText}>{exportMessage}</Text>}
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
    exportMessage: string
}

export default ExportButton;
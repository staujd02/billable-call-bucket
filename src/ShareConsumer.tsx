import React from "react";
import { View, Text } from "react-native";
import { ShareConsumerProps } from "../types/routes";

const ShareConsumer = ({ navigation, route }: ShareConsumerProps) => {

    const { sharedContent } = route.params;
    const { extraData, text } = sharedContent || {};

    return (
        <View>
            {!text && !extraData && <Text>No Content.</Text>}
            {text && <Text>The Text:</Text>}
            {text && <Text>{text}</Text>}
            {extraData && <Text>Extras:</Text>}
            {extraData && <Text>{JSON.stringify(extraData)}</Text>}
        </View>
    );
}

export default ShareConsumer;
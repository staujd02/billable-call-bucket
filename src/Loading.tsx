import { StyleSheet, Text, View } from "react-native";
import { AppColorStyles, AppFontStyles } from "../styles/default";

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: AppColorStyles.navigationBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 40
  },
});
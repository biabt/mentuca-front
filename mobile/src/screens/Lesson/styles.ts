import { StyleSheet } from "react-native";
import { Colors, Fonts, Spacing } from "../../themes";

const styles = StyleSheet.create({
innerProgressBar: {
    width: "80%",
  },
  progressBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
    container: {
    width: "100%",
    marginVertical: Spacing.small,
    margin: Spacing.small,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    padding: Spacing.small,
  },
  });

export default styles;
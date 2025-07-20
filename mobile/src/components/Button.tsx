import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors, Fonts, Spacing} from "../themes";

type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps {
  title: string;
  size?: ButtonSize;
  fill?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  size,
  fill,
  onPress,
  style,
  textStyle,
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 12, paddingHorizontal: 24 };
      case "large":
        return { paddingVertical: 12, paddingHorizontal: 80 };
      case "medium":
      default:
        return { paddingVertical: 12, paddingHorizontal: 64 };
    }
  };
  const [changeFill, setChangeFilled] = useState(fill);
  const backgroundColor = changeFill ? Colors.primary : "transparent";
  const textColor = changeFill ? Colors.background.ligth : Colors.primary;
  const borderColor = Colors.primary;

  const handlePress = () => {
    setChangeFilled((prev) => !prev);
    onPress(); 
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        getSizeStyle(),
        {
          backgroundColor,
          borderColor,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    margin: Spacing.small,
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
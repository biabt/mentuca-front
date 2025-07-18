import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Colors, Fonts, Spacing } from "../themes";

interface CustomTitleProps {
  title: string;
  subtitle?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const CustomTitle: React.FC<CustomTitleProps> = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
    </View>
  );
};

export default CustomTitle;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: Spacing.small,
    marginHorizontal: Spacing.small,
  },
  title: {
    fontSize: Fonts.size.xlarge,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  subtitle: {
    marginTop: Spacing.xsmall,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.regular,
    color: Colors.muted,
  },
});

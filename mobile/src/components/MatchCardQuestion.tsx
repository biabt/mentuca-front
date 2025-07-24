import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView
} from "react-native";
import { Colors, Fonts, Spacing} from "../themes";
import { Ionicons } from '@expo/vector-icons'; 
import CustomTitle from "./Title";
import Macroarea from "./Macroarea";
import api from "../services/api";
import {MatchCardInterface} from "../types/questions";

interface MatchCardQuestionProps {
  questionJson: MatchCardInterface;
  onAnswer: (isCorrect: boolean) => void;
}

const MatchCardQuestion: React.FC<MatchCardQuestionProps> = ({
    questionJson,
    onAnswer
}) => {

    return (
        <View>
            <Text>pares</Text>
        </View>
    );
};

export default MatchCardQuestion;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: Spacing.small,
    margin: Spacing.small,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.background.medium,
    padding: Spacing.small,
    borderRadius: 8,
  },
  innerContainer: {
    marginVertical: Spacing.small,
    margin: Spacing.small,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  scrollView: {
    maxHeight: "70%",
    width: "100%",
  },
  iconButton: {
    marginVertical: Spacing.small,
    margin: Spacing.small,
    backgroundColor: Colors.pink.ligth,
    padding: Spacing.small,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.background.ligth,
    padding: Spacing.small,
    borderRadius: 12,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: Spacing.large,
    left: Spacing.large,
    zIndex: 1,
  },
  modalCloseIcon: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: Fonts.bold,
  },
})
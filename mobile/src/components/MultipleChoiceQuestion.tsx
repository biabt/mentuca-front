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
import {MultipleChoiceInterface} from "../types/questions";
import CustomButton from "./Button";

interface MultipleChoiceQuestionProps {
  questionJson: MultipleChoiceInterface;
  onAnswer: (isCorrect: boolean) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    questionJson,
    onAnswer
}) => {
  const itens = questionJson.itens;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;

    setSelectedIndex(index);
    setAnswered(true);
    const isCorrect = index === questionJson.itemCerto;
    onAnswer(isCorrect);
  };

    return (
        <View>
          <ScrollView style={[styles.enunciadoView]}>
            <Text>{questionJson.enunciado}</Text>
          </ScrollView>
            {itens.map ((option, index) => {
              const isSelected = index === selectedIndex;
              const isCorrect = index === questionJson.itemCerto;

              let backgroundColor = "white";
              if (answered) {
                if (isSelected && isCorrect) backgroundColor = "lightgreen";
                else if (isSelected && !isCorrect) backgroundColor = "lightcoral";
                else if (isCorrect) backgroundColor = "lightgreen";
              }
            return (
              <CustomButton onPress={() => handleSelect(index)} title={option} style={[styles.option, { backgroundColor }]}></CustomButton>
              );
            })}
          <CustomButton title="SUBMETER RESPOSTA" onPress={onAnswer} filled></CustomButton>
        </View>
    );
};

export default MultipleChoiceQuestion;

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
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  enunciadoView: {
    maxHeight: "40%",
    minHeight: "10%",
  },
})
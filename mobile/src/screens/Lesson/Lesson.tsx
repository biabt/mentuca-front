
import React, { useEffect, useState } from "react";import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import QuestionRenderer from "../../components/QuestionRenderer";
import styles from "./styles";
import { Question } from "../../types/questions";

export default function Lesson() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [questions, setQuestions] = useState([{
    "id": "q1",
    "type": "multiple_choice",
    "prova": "FUVEST",
    "question_json":{
        "enunciado": "What is the capital of Brazil?",
        "itens": ["São Paulo", "Brasília", "Rio", "Salvador", "Belo Horizonte"],
        "itemCerto": 1
    }}]);

  const handleAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // mostrar resultado final
    }
  };

  return (
    <View style={[styles.container]}>
       <View style={[styles.innerProgressBar]}>
            <Progress.Bar
            progress={currentIndex / questions.length}
            height={6}
            width={null}
            />
        </View>
      {showModal && (
        <QuestionRenderer
          questionType={questions[currentIndex].type}
          questionJson={questions[currentIndex].question_json as Question}
          prova={questions[currentIndex].prova}
          onAnswer={handleAnswer}
        />
      )}
    </View>
  );
};
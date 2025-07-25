
import React, { useEffect, useState } from "react";import { View, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import QuestionRenderer from "../../components/QuestionRenderer";
import styles from "./styles";
import { Question } from "../../types/questions";
import { Ionicons } from '@expo/vector-icons'; 

export default function Lesson({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [questions, setQuestions] = useState([{
    "id": "q1",
    "type": "multiple_choice",
    "prova": "FUVEST",
    "question_json":{
        "enunciado": "Qual é a Capital do Brasil?",
        "itens": ["São Paulo", "Brasília", "Rio", "Salvador", "Belo Horizonte"],
        "itemCerto": 1
    }}, { 
    "id": "q1",
    "type": "multiple_choice",
    "prova": "ITA",
    "question_json":{
        "enunciado": "No filme Meninas Malvadas, onde e quando Regina George traia Aaron Samuels",
        "itens": ["Na casa dele, todo sábado", "Na igreja, todo domingo", "No vestiário masculino, toda segunda-feira", "Na sala de projeção toda quinta-feira", "Regina nunca traiu Aaron"],
        "itemCerto": 3
    }}]);

  const handleAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.upperBarContainer]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="chevron-back-outline" size={32}></Ionicons>
        </TouchableOpacity>
        <View style={[styles.innerProgressBar]}>
          <Progress.Bar
          progress={currentIndex / questions.length}
          height={6}
          width={null}
          />
        </View>
        <Ionicons style={styles.closeButton} name="flash-outline" size={32}></Ionicons>
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
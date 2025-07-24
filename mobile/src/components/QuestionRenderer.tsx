import React from 'react';
import { Text } from "react-native";
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import MatchCardQuestion from './MatchCardQuestion';
import { Question, MultipleChoiceInterface, MatchCardInterface } from '../types/questions';

interface QuestionRendererProps {
  questionType: string;
  questionJson: Question;
  prova?: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
    questionType,
    questionJson,
    prova,
    onAnswer
 }) => {
  switch (questionType) {
    case 'multiple_choice':
      return <MultipleChoiceQuestion questionJson={questionJson as MultipleChoiceInterface} onAnswer={onAnswer}/>;
    case 'match_cards':
      return <MatchCardQuestion questionJson={questionJson as MatchCardInterface} onAnswer={onAnswer}/>;
    default:
      return <Text>Tipo de questão desconhecido.</Text>;
  }
};

export default QuestionRenderer;
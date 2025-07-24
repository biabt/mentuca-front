export interface BaseQuestion {
  type: string;
  prova: string;
  question_json: Question;
}

export interface MultipleChoiceInterface extends BaseQuestion{
  enunciado: string;
  itens: string[];
  itemCerto: number;
}

export interface MatchCardInterface extends BaseQuestion {
  pares: { concept: string; definition: string }[];
}

export type Question = MultipleChoiceInterface | MatchCardInterface;

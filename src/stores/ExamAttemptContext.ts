import { createContext } from "react";
import { AnswerMap } from "../types/AnswerMap";

type ExamAttemptContextType = {
  answers: AnswerMap;
  setAnswers: (key: string, value: string) => void;
  activeQuestionIndex: number;
  setActiveQuestionIndex: (index: number) => void;
};

export const ExamAttemptContext = createContext<ExamAttemptContextType>({
  answers: {},
  setAnswers: () => {},
  activeQuestionIndex: 0,
  setActiveQuestionIndex: () => {},
});

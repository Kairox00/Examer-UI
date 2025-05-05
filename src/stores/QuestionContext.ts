import { createContext } from "react";

type QuestionContextType = {
  selectedChoice: string | null;
  setSelectedChoice: (id: string) => void;
};

const QuestionContext = createContext<QuestionContextType>({
  selectedChoice: null,
  setSelectedChoice: () => {},
});

export default QuestionContext;

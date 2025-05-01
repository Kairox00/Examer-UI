import { createContext } from "react";

const QuestionContext = createContext({
  selectedChoice: "",
  setSelectedChoice: (id: string) => {
    console.log(`Selected choice ID: ${id}`);
  },
});

export default QuestionContext;

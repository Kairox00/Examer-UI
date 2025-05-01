import { List, ListItem } from "@mui/material";
import { Question } from "../../../types/Question";

const QuestionsList = ({ questions }: { questions: Question[] }) => {
  return (
    <List>
      {questions.map((question) => (
        <ListItem key={question.id}>{question.text}</ListItem>
      ))}
    </List>
  );
};

export default QuestionsList;

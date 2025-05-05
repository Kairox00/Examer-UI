import { List, ListItem, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ExamAttemptContext } from "../../../stores/ExamAttemptContext";
import { Question } from "../../../types/Question";

const QuestionItem = ({ question }: { question: Question }) => {
  const { setActiveQuestionIndex } = useContext(ExamAttemptContext);
  return (
    <Stack
      width={"100%"}
      onClick={() => setActiveQuestionIndex(question.number! - 1)}
      component={"div"}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <Typography fontWeight={"bold"}>Question {question.number} </Typography>
        <Typography
          fontWeight={"300"}
          color={question.isAnswered ? "green" : "red"}
        >
          {question.isAnswered ? "Answered" : "Not Answered"}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        maxWidth={"100%"}
        textOverflow={"ellipsis"}
        overflow={"hidden"}
      >
        {question.text}
      </Typography>
    </Stack>
  );
};

const QuestionsList = ({ questions }: { questions: Question[] }) => {
  const { answers } = useContext(ExamAttemptContext);
  questions = questions.map((question) => ({
    ...question,
    isAnswered: answers[question.id] !== undefined,
  }));
  return (
    <List>
      {questions.map((question) => (
        <ListItem key={question.id}>
          <QuestionItem question={question} />
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionsList;

import { List, ListItem, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ExamAttemptContext } from "../../../stores/ExamAttemptContext";
import { Question } from "../../../types/Question";

const QuestionItem = ({ question }: { question: Question }) => {
  const { activeQuestionIndex, setActiveQuestionIndex } =
    useContext(ExamAttemptContext);
  const activeStyling = {
    backgroundColor: "black",
    color: "white",
  };
  const inactiveStyling = {
    backgroundColor: "transparent",
    color: "inherit",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      color: "black",
    },
  };
  return (
    <Stack
      width={"100%"}
      onClick={() => setActiveQuestionIndex(question.number! - 1)}
      component={"div"}
      padding={2}
      sx={{
        cursor: "pointer",
        ...(activeQuestionIndex === question.number! - 1
          ? activeStyling
          : inactiveStyling),
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <Typography fontWeight={"bold"}>Question {question.number} </Typography>
        {question.isAnswered && (
          <Typography fontWeight={"300"} color={"green"}>
            Answered
          </Typography>
        )}
      </Stack>
      <Typography
        variant="body2"
        maxWidth={"100%"}
        textOverflow={"ellipsis"}
        overflow={"hidden"}
        fontWeight={"300"}
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
    <List
      sx={{
        borderRight: "1px solid #ccc",
        height: "100vh",
        maxHeight: "100vh",
        overflowY: "scroll",
        padding: "0px !important",
      }}
    >
      {questions.map((question) => (
        <ListItem key={question.id} sx={{ padding: 0 }}>
          <QuestionItem question={question} />
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionsList;

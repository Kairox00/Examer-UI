import {
  Button,
  FormControl,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ExamAttemptContext } from "../../../stores/ExamAttemptContext";
import QuestionContext from "../../../stores/QuestionContext";
import { Choice } from "../../../types/Choice";
import { Question } from "../../../types/Question";
import { useSubmitQuestionAnswer } from "../api/submit-question-answer";
import ChoiceButton from "./ChoiceButton";

interface ActiveQuestionProps {
  question: Question;
  handleNextQuestion: (activeQuestionIndex: number) => void;
}

const ActiveQuestion = ({
  question,
  handleNextQuestion,
}: ActiveQuestionProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const { id: examId = "" } = useParams();
  const submitAnswerMutation = useSubmitQuestionAnswer(
    examId,
    "b86458b1-53fc-41fc-9acb-84f6710d12d9",
    question.id,
    selectedChoice!,
    {
      onSuccess: () => {
        setSelectedChoice(null);
        handleNextQuestion(question.number!);
      },
    }
  );
  const { answers, setAnswers } = useContext(ExamAttemptContext);

  const updateAnswers = () => {
    setAnswers(question.id, selectedChoice!);
  };

  if (!examId) return <div>Exam ID not found</div>;

  const choices = question.choices.map((choice: Choice) => (
    <ChoiceButton key={choice.id} choice={choice} />
  ));

  return (
    <QuestionContext value={{ selectedChoice, setSelectedChoice }}>
      <Stack sx={{ width: "100%" }} alignItems={"flex-start"} spacing={2}>
        <Typography variant="body1">Question {question.number}:</Typography>
        <Typography variant="body1">{question.text}</Typography>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            name="radio-buttons-group"
            sx={{ width: "100%" }}
            onChange={updateAnswers}
          >
            {choices}
          </RadioGroup>
        </FormControl>
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          justifyContent={"flex-end"}
        >
          <Button
            variant="contained"
            loading={submitAnswerMutation.isPending}
            disabled={!selectedChoice}
            onClick={() => submitAnswerMutation.mutate()}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </QuestionContext>
  );
};

export default ActiveQuestion;

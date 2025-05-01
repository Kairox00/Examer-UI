import { FormControl, RadioGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";
import QuestionContext from "../../../stores/QuestionContext";
import { Choice } from "../../../types/Choice";
import { Question } from "../../../types/Question";
import ChoiceButton from "./ChoiceButton";

const ActiveQuestion = ({ question }: { question: Question }) => {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const choices = question.choices.map((choice: Choice) => (
    <ChoiceButton key={choice.id} choice={choice} />
  ));
  return (
    <QuestionContext value={{ selectedChoice, setSelectedChoice }}>
      <Stack sx={{ width: "100%" }} alignItems={"flex-start"} paddingX={20}>
        <Typography variant="body1">Question {question.number}:</Typography>
        <br />
        <Typography variant="body1">{question.text}</Typography>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            defaultValue={question.choices[0].id}
            name="radio-buttons-group"
            sx={{ width: "100%" }}
          >
            {choices}
          </RadioGroup>
        </FormControl>
      </Stack>
    </QuestionContext>
  );
};

export default ActiveQuestion;

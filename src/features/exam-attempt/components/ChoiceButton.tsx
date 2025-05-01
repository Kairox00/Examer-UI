import { FormControlLabel, Radio, styled } from "@mui/material";
import { useContext } from "react";
import QuestionContext from "../../../stores/QuestionContext";
import { Choice } from "../../../types/Choice";

const StyledFormControlLabel = styled(FormControlLabel)<{
  isSelected: boolean;
}>(({ theme, isSelected }) => ({
  width: "100%",
  border: `1px solid ${isSelected ? theme.palette.primary.main : "grey"}`,
  borderRadius: "5px",
  margin: theme.spacing(1, 0),
  ":hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
  },
}));

const ChoiceButton = ({ choice }: { choice: Choice }) => {
  const { selectedChoice, setSelectedChoice } = useContext(QuestionContext);
  const handleClick = () => {
    setSelectedChoice(choice.id);
  };
  return (
    <StyledFormControlLabel
      value={choice.id}
      control={<Radio />}
      label={choice.text}
      onClick={handleClick}
      isSelected={selectedChoice === choice.id}
    />
  );
};

export default ChoiceButton;

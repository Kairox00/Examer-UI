import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Exam } from "../../../types/Exam";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "200px",
  height: "200px",
  padding: theme.spacing(2),
}));

const ExamCard = ({ exam }: { exam: Exam }) => {
  const navigate = useNavigate();

  const onStartClick = () => {
    navigate(`/exam-attempt/${exam.id}`);
  };

  return (
    <StyledCard variant="outlined">
      <Stack height="100%" justifyContent="space-between">
        <CardHeader title={exam.name} />
        <CardContent>
          <Typography variant="body1">
            {exam.numberOfQuestions} question{exam.numberOfQuestions > 1 && "s"}
          </Typography>
          <Typography variant="body1">{exam.duration / 60} minutes</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", justifySelf: "end" }}>
          <Button variant="contained" size="medium" onClick={onStartClick}>
            Start
          </Button>
        </CardActions>
      </Stack>
    </StyledCard>
  );
};

export default ExamCard;

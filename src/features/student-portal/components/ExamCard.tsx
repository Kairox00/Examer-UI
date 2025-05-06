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
import { useStartExam } from "../api/start-exam";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "200px",
  height: "200px",
  padding: theme.spacing(2),
}));

const ExamCard = ({ exam }: { exam: Exam }) => {
  const navigate = useNavigate();
  const examAttemptMutation = useStartExam(
    exam.id,
    "b86458b1-53fc-41fc-9acb-84f6710d12d9",
    {
      onSuccess: (response: any) => {
        navigate(`/exam-attempt/${exam.id}`, {
          state: {
            exam,
            startedAt: response.data.startedAt,
          },
        });
      },
    }
  );

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
          <Button
            variant="contained"
            size="medium"
            onClick={() => examAttemptMutation.mutate()}
          >
            Start
          </Button>
        </CardActions>
      </Stack>
    </StyledCard>
  );
};

export default ExamCard;

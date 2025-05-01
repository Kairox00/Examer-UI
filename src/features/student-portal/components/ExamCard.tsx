import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Exam } from "../../../types/Exam";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "200px",
  height: "200px",
  padding: theme.spacing(2),
}));

const ExamCard = ({ exam }: { exam: Exam }) => {
  return (
    <StyledCard variant="outlined">
      <Stack height="100%" justifyContent="space-between">
        <CardContent>
          <Typography variant="h5">{exam.name}</Typography>
          <Typography variant="body1">This is an exam</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", justifySelf: "end" }}>
          <Button variant="contained" size="medium">
            Start
          </Button>
        </CardActions>
      </Stack>
    </StyledCard>
  );
};

export default ExamCard;

import { Grid } from "@mui/material";
import { Exam } from "../../../types/Exam";
import ExamCard from "./ExamCard";

export default function ExamsGroup({ exams }: { exams: Exam[] }) {
  const gridItems = exams?.map((exam) => (
    <Grid key={exam.id}>
      <ExamCard exam={exam} />
    </Grid>
  ));
  return (
    <Grid container spacing={6} padding={2}>
      {gridItems}
    </Grid>
  );
}

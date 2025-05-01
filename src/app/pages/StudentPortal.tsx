import { Box, Grid } from "@mui/material";
import { useStudent } from "../../features/student-portal/api/get-student";
import ExamCard from "../../features/student-portal/components/ExamCard";

export default function StudentPortal() {
  const studentQuery = useStudent("b86458b1-53fc-41fc-9acb-84f6710d12d9");
  if (studentQuery.isPending) return <div>Loading...</div>;
  if (studentQuery.isError) return <div>Error loading student data</div>;
  const student = studentQuery.data?.data;
  const exams = student.exams;
  return (
    <Box>
      <h1>Student Portal</h1>
      <Grid container spacing={6}>
        {exams?.map((exam) => (
          <Grid key={exam.id}>
            <ExamCard exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

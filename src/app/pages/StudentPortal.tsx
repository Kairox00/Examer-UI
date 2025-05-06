import { Box } from "@mui/material";
import { useStudent } from "../../features/student-portal/api/get-student";
import GradesGroup from "../../features/student-portal/components/GradesGroup";
import { useError } from "../../stores/ErrorAlertContext";
import { useLoading } from "../../stores/LoadingContext";

export default function StudentPortal() {
  const studentQuery = useStudent("b86458b1-53fc-41fc-9acb-84f6710d12d9");
  const { showError } = useError();
  const { showLoading } = useLoading();
  if (studentQuery.isError) {
    showError(studentQuery.error.message);
    return;
  }
  if (studentQuery.isPending) {
    showLoading(true);
    return;
  }
  showLoading(false);

  const student = studentQuery.data?.data;
  const exams = student.exams;
  return (
    <Box>
      <h1>Student Portal</h1>
      {/* <ExamsGroup exams={exams} /> */}
      <GradesGroup exams={exams} studentId={student.id} />
    </Box>
  );
}

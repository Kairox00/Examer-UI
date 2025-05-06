import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useStudentQuery } from "../../features/student-portal/api/get-student";
import ExamsGroup from "../../features/student-portal/components/ExamsGroup";
import GradesGroup from "../../features/student-portal/components/GradesGroup";
import Navbar from "../../features/student-portal/components/Navbar";
import { useError } from "../../stores/ErrorAlertContext";
import { useLoading } from "../../stores/LoadingContext";

export default function StudentPortal() {
  const navItems = ["Exams", "Grades"];
  const studentQuery = useStudentQuery("b86458b1-53fc-41fc-9acb-84f6710d12d9");
  const [group, setGroup] = useState(navItems[0]);
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
    <Stack direction={"row"}>
      <Navbar navItems={navItems} setGroup={setGroup} />
      <Box width={"100%"} marginTop={10}>
        {group === "Exams" && <ExamsGroup exams={exams} />}
        {group === "Grades" && (
          <GradesGroup exams={exams} studentId={student.id} />
        )}
      </Box>
    </Stack>
  );
}

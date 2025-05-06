import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useError } from "../../../stores/ErrorAlertContext";
import { useLoading } from "../../../stores/LoadingContext";
import { Exam } from "../../../types/Exam";
import { useExamResultsQuery } from "../api/get-exam-results";

export default function GradesGroup({
  exams,
  studentId,
}: {
  exams: Exam[];
  studentId: string;
}) {
  const { showError } = useError();
  const { showLoading } = useLoading();
  const examResultsQuery = useExamResultsQuery(exams, studentId);
  if (examResultsQuery.isError) {
    showError(examResultsQuery.error.message);
    return;
  }
  if (examResultsQuery.isPending) {
    showLoading(true);
    return;
  }
  showLoading(false);
  const results = examResultsQuery.data;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exam</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>{exam.name}</TableCell>
              <TableCell>
                {
                  results.find((result) => result.data.examId === exam.id)?.data
                    .score
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

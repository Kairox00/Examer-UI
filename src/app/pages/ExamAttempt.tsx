import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useExamQuestions } from "../../features/exam-attempt/api/get-exam-questions";
import ActiveQuestion from "../../features/exam-attempt/components/ActiveQuestion";
import QuestionsList from "../../features/exam-attempt/components/QuestionsList";
export default function ExamAttempt() {
  const { id: examId = "" } = useParams();
  const examQuestionsQuery = useExamQuestions(examId);
  if (examQuestionsQuery.isPending) return <div>Loading...</div>;
  if (examQuestionsQuery.isError)
    return <div>Error loading exam questions</div>;
  const questions = examQuestionsQuery.data?.data.map((question, index) => ({
    ...question,
    choices: question.choices.sort(() => Math.random() - 0.5),
    number: index + 1,
  }));
  return (
    <Stack direction={"row"}>
      <QuestionsList questions={questions} />
      <ActiveQuestion question={questions[0]} />
    </Stack>
  );
}

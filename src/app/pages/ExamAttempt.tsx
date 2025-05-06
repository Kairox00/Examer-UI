import { Box, Stack } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useExamQuestions } from "../../features/exam-attempt/api/get-exam-questions";
import { useSubmitExam } from "../../features/exam-attempt/api/submit-exam";
import ActiveQuestion from "../../features/exam-attempt/components/ActiveQuestion";
import Progress from "../../features/exam-attempt/components/Progress";
import QuestionsList from "../../features/exam-attempt/components/QuestionsList";
import TimeLeft from "../../features/exam-attempt/components/TimeLeft";
import { ExamAttemptContext } from "../../stores/ExamAttemptContext";
import setAnswerReducer from "../../stores/setAnswerReducer";
import { Question } from "../../types/Question";
export default function ExamAttempt() {
  const { id: examId = "" } = useParams();
  const {
    state: { exam, startedAt },
  } = useLocation();
  const [answers, dispatch] = useReducer(setAnswerReducer, {});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const examQuestionsQuery = useExamQuestions(examId);
  const submitExamMutation = useSubmitExam(
    examId,
    "b86458b1-53fc-41fc-9acb-84f6710d12d9",
    {
      onSuccess: () => {
        navigate("/student-portal");
      },
    }
  );
  const navigate = useNavigate();

  const setAnswers = (key: string, value: string) => {
    dispatch({ key, value });
  };

  const handleNextQuestion = (questionNumber: number) => {
    if (questionNumber !== questions.length) {
      setActiveQuestionIndex(questionNumber);
    }
  };

  const onQuerySuccess = (data: any) => {
    const questions =
      data?.data.map((question: Question, index: number) => ({
        ...question,
        choices: question.choices.sort(() => Math.random() - 0.5),
        number: index + 1,
      })) || [];
    setQuestions(questions);
    setActiveQuestionIndex(0);
  };

  useEffect(() => {
    onQuerySuccess(examQuestionsQuery.data);
  }, [examQuestionsQuery.data]);

  if (examQuestionsQuery.isPending || questions.length === 0)
    return <div>Loading...</div>;
  if (examQuestionsQuery.isError)
    return <div>Error loading exam questions</div>;
  return (
    <ExamAttemptContext
      value={{
        answers,
        setAnswers,
        setActiveQuestionIndex,
        activeQuestionIndex,
      }}
    >
      <Stack direction={"row"}>
        <Box width={"30%"}>
          <QuestionsList questions={questions} />
        </Box>
        <Box width={"70%"} paddingX={10} paddingY={5}>
          <Progress
            activeQuestionIndex={activeQuestionIndex}
            numberOfQuestions={questions.length}
          />
          <TimeLeft
            startTime={startedAt}
            duration={exam.duration}
            submitExamMutation={submitExamMutation}
          />
          <ActiveQuestion
            question={questions![activeQuestionIndex]}
            handleNextQuestion={handleNextQuestion}
          />
        </Box>
      </Stack>
    </ExamAttemptContext>
  );
}

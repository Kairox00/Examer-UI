import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Exam } from "../../../types/Exam";
import { Question } from "../../../types/Question";
import { useAnswersQuery } from "../api/get-answers";
import { useQuestionsQuery } from "../api/get-exam-questions";

export default function GradesRow({
  exam,
  results,
}: {
  exam: Exam;
  results: any[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState<any>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const questionsQuery = useQuestionsQuery(exam.id, {
    enabled: expanded,
  });
  const answersQuery = useAnswersQuery(
    "b86458b1-53fc-41fc-9acb-84f6710d12d9",
    exam.id,
    {
      enabled: expanded,
    }
  );

  useEffect(() => {
    if (questionsQuery.isSuccess && answersQuery.isSuccess) {
      setQuestions(questionsQuery.data.data);
      setAnswers(answersQuery.data.data);
    }
  }, [questionsQuery, answersQuery]);

  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="text" onClick={() => setExpanded(!expanded)}>
            {expanded ? "-" : "+"}
          </Button>
        </TableCell>
        <TableCell>{exam.name}</TableCell>
        <TableCell>
          {results.find((result) => result.data.examId === exam.id)?.data.score}
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={3}>
            <Stack>
              {answersQuery.isPending && questionsQuery.isPending && (
                <div>Loading...</div>
              )}
              {answersQuery.isError && questionsQuery.isError && (
                <div>Error</div>
              )}
              {answersQuery.isSuccess &&
                questionsQuery.isSuccess &&
                answers.map((answer: any, index: number) => {
                  const choice = answer.choice;
                  const question = questions.find(
                    (question) => question.id === answer.questionId
                  );
                  return (
                    <Stack spacing={1} marginBottom={2}>
                      <Typography fontWeight={"bold"}>
                        Question {index + 1}: {question?.text}
                      </Typography>
                      <Typography color={choice.isCorrect ? "green" : "red"}>
                        Your Answer: {choice.text}
                      </Typography>
                      {!choice.isCorrect && (
                        <Typography>
                          Correct Answer:{" "}
                          {
                            question?.choices.find(
                              (choice) => choice?.isCorrect
                            )?.text
                          }
                        </Typography>
                      )}
                      <Typography>
                        Score: {choice.isCorrect ? question?.score : 0}/
                        {question?.score}
                      </Typography>
                    </Stack>
                  );
                })}
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

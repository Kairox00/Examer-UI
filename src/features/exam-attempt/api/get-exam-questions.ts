import { queryOptions, useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";
import { Question } from "../../../types/Question";

const getExamQuestions = (examId: string): Promise<{ data: Question[] }> => {
  return apiClient.get(`/exams/${examId}/questions`);
};

export const useExamQuestions = (examId: string) => {
  const options = queryOptions({
    queryKey: ["exam-questions", examId],
    queryFn: () => getExamQuestions(examId),
  });
  return useQuery(options);
};

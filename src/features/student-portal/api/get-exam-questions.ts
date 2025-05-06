import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";
import { Question } from "../../../types/Question";

const getQuestions = (examId: string): Promise<{ data: Question[] }> => {
  return apiClient.get(`/exams/${examId}/questions`);
};

export const useQuestionsQuery = (examId: string, options: any) => {
  options = {
    ...options,
    queryKey: ["exam-questions", examId],
    queryFn: () => getQuestions(examId),
  };
  return useQuery(options);
};

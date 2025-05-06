import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";

const getAnswers = (
  studentId: string,
  examId: string
): Promise<{ data: any }> => {
  return apiClient.get(`/exams/${examId}/students/${studentId}/answers`);
};

export const useAnswersQuery = (
  studentId: string,
  examId: string,
  options: any
) => {
  options = {
    ...options,
    queryKey: ["student-exam-answers", studentId, examId],
    queryFn: () => getAnswers(studentId, examId),
  };
  return useQuery(options);
};

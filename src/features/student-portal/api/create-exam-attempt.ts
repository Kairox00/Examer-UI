import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";

const createExamAttempt = (examId: string, studentId: string) => {
  return apiClient.post(`/exams/${examId}/students`, {
    id: studentId,
  });
};

export const useCreateExamAttempt = (
  examId: string,
  studentId: string,
  options?: any
) => {
  options = {
    ...options,
    mutationFn: () => createExamAttempt(examId, studentId),
  };
  return useMutation(options);
};

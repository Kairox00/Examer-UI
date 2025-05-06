import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";

const startExam = (examId: string, studentId: string) => {
  return apiClient.put(`/exams/${examId}/students/${studentId}/start`, {});
};

export const useStartExam = (
  examId: string,
  studentId: string,
  options?: any
) => {
  options = {
    ...options,
    mutationFn: () => startExam(examId, studentId),
  };
  return useMutation(options);
};

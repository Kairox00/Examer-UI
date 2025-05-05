import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";

const submitExam = (examId: string, studentId: string) => {
  return apiClient.put(`/exams/${examId}/students/${studentId}`, {});
};

export const useSubmitExam = (
  examId: string,
  studentId: string,
  options?: any
) => {
  options = {
    ...options,
    mutationFn: () => submitExam(examId, studentId),
  };
  return useMutation(options);
};

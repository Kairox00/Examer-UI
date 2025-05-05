import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";

const submitQuestionAnswer = (
  examId: string,
  studentId: string,
  questionId: string,
  choiceId: string
) => {
  return apiClient.post(`/exams/${examId}/students/${studentId}/answers`, {
    questionId,
    choice: {
      id: choiceId,
    },
  });
};

export const useSubmitQuestionAnswer = (
  examId: string,
  studentId: string,
  questionId: string,
  choiceId: string,
  options?: any
) => {
  options = {
    ...options,
    mutationFn: () =>
      submitQuestionAnswer(examId, studentId, questionId, choiceId),
  };
  return useMutation(options);
};

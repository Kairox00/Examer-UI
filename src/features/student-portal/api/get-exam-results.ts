import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import apiClient from "../../../lib/api-client";
import { Exam } from "../../../types/Exam";

const getExamResults = (
  exams: Exam[],
  studentId: string
): Promise<AxiosResponse[]> => {
  const promises = exams.map((exam: Exam) =>
    apiClient.get(`/exams/${exam.id}/students/${studentId}`)
  );
  return Promise.all(promises);
};

export const useExamResultsQuery = (exams: Exam[], studentId: string) => {
  const options = queryOptions({
    queryKey: ["exam-result", exams, studentId],
    queryFn: () => getExamResults(exams, studentId),
  });
  return useQuery(options);
};

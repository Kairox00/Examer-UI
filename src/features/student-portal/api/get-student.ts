import { queryOptions, useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";
import { Student } from "../../../types/Student";

const getStudent = (studentId: string): Promise<{ data: Student }> => {
  return apiClient.get(`/students/${studentId}`);
};

export const useStudentQuery = (studentId: string) => {
  const options = queryOptions({
    queryKey: ["student", studentId],
    queryFn: () => getStudent(studentId),
  });
  return useQuery(options);
};

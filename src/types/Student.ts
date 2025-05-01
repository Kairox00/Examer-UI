import { Exam } from "./Exam";

export type Student = {
  id: string;
  name: string;
  exams: [Exam];
};

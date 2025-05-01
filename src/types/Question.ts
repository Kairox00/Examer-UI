import { Choice } from "./Choice";

export type Question = {
  id: string;
  text: string;
  choice: string;
  score: number;
  choices: Choice[];
  number?: number;
};

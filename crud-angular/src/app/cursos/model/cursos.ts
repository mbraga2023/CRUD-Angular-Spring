import { Aulas } from "./aulas";

export interface Cursos {
  _id: string;
  name: string;
  category: string;
  aulas?: Aulas[];
}

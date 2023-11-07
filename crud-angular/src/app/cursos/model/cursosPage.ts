import { Cursos } from "./cursos";

export interface CursosPage {
  cursos: Cursos[];
  totalElements: number;
  totalPages?: number;
}

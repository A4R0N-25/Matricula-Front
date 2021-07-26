import { Horario } from "./horario";

export class Curso{
    nrc!: number;
    cupo!: number;
    disponible!: number;
    creditos!: number;
    carreras!:String[] | null;
    horarios!:Horario[] | null;

}
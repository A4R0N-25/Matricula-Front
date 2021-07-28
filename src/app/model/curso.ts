import { Horario } from "./horario";

export class Curso{
    codigo!:number;
    nrc!: number;
    cupo!: number;
    asignatura!:String
    disponible!: number;
    creditos!: number;
    carreras!:String[] | null;
    horarios!:Horario[] | null;

}
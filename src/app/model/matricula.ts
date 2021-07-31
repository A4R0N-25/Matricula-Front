import { MatriculaDetalle } from "./matriculaDetalle";

export class Matricula{
    codigo!: number;
    fecha!: Date;
    periodo!:String;
    creditosTotales!: number;
    detalles!:MatriculaDetalle[];
}
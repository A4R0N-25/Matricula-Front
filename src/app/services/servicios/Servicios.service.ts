import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actualizacion } from 'src/app/model/actualizacion';
import { Asignatura } from 'src/app/model/asignatura';
import { Departmanento } from 'src/app/model/departamento';
import { Estudiante } from 'src/app/model/estudiante';
import { MatriculaRQ } from 'src/app/model/matriculaRQ';
import { Periodo } from 'src/app/model/periodo';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:8080/api/';


  getDepartamentos(): Observable<any> {
    return this.http.get<Departmanento>(this.Url + "departamento/");
  }


  getPeriodos(): Observable<any> {
    return this.http.get<Periodo>(this.Url + "periodo/");
  }

  getAsignaturas(departamento: number, periodo: number): Observable<any> {
    return this.http.get<Asignatura>(this.Url + "asignatura/" + departamento + "/" + periodo);
  }

  getCursos(asignatura: number, periodo: number): Observable<any> {
    return this.http.get(this.Url + "curso/" + asignatura + "/" + periodo);
  }

  getCurso(nrc: number): Observable<any> {
    return this.http.get(this.Url + "curso/" + nrc);
  }

  matricularse(matricula: MatriculaRQ) {
    return this.http.post(this.Url + "matricula/", matricula);
  }

  buscarMatricula(correo: String | null, periodo: number): Observable<any> {
    return this.http.get(this.Url + "matricula/?correo=" + correo + "&periodo=" + periodo);
  }

  borrarDetalleMatricula(codigo: number) {
    return this.http.delete(this.Url + "matricula/" + codigo);
  }

  obtenerAllCarreras(): Observable<any> {
    return this.http.get(this.Url + "carrera");
  }

  obtenerAllMatriculasEstudiante(correo: String | null): Observable<any> {
    return this.http.get(this.Url + "matricula/"+correo);
  }

  obtenerEstudiante(correo:String | null): Observable<any> {
    return this.http.get(this.Url + "estudiante/"+correo);
  }

  nuevoEstudiante(estudiante:Estudiante){
    return this.http.post(this.Url + "estudiante/",estudiante);
  }

  actualizarEstudiante(usuario:String,estudiante:Actualizacion){
    return this.http.put(this.Url + "estudiante/"+usuario,estudiante);
  }
}

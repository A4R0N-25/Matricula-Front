import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/model/estudiante';
import { Matricula } from 'src/app/model/matricula';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {

  constructor(private service: ServiciosService, private router: Router) { }

  matriculas: Matricula[]=[]

  estudiante: Estudiante = new Estudiante;

  columnsToDisplay = ['N°', 'Periodo', 'CreditosTotales', 'Fecha'];

  ngOnInit() {
    this.getMatriculas()
    this.getEstudiante()
  }

  getMatriculas(){
    this.matriculas=[]
    this.service.obtenerAllMatriculasEstudiante(sessionStorage.getItem('correo')).subscribe(res =>{
      console.log(res)
      res.forEach((element: { codigo: any; creditosTotales: any; fecha: any; periodo: any; detalle: any; }) => {
        this.matriculas.push({
          codigo: element.codigo,
          creditosTotales: element.creditosTotales,
          fecha: element.fecha,
          periodo: element.periodo,
          detalles: element.detalle
        })
        
      });
    })
  }


  getEstudiante(){
    this.service.obtenerEstudiante(sessionStorage.getItem('correo')).subscribe(res =>{
      this.estudiante={
        tipo: res.tipo,
        identificacion: res.identificacion,
        nombre: res.nombre,
        apellido: res.apellido,
        correo: res.correo,
        telefono: res.telefono,
        direccion: res.direccion,
        genero: res.genero,
        carrera: res. carrera,
        contrasena: res.contraseña
      }
    })
  }

  editar(){
    this.router.navigate(["/principal/datos"]);
  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asignatura } from 'src/app/model/asignatura';
import { Curso } from 'src/app/model/curso';
import { Departmanento } from 'src/app/model/departamento';
import { Periodo } from 'src/app/model/periodo';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor(private service:ServiciosService) { }

  busqueda = new FormGroup({
    periodo: new FormControl('',[Validators.required]),
    departamento: new FormControl('',[Validators.required]),
    materia: new FormControl('',[Validators.required])
  });

  buscar:boolean=true

  listaDepartamentos : Departmanento[] =[];
  listaPeriodos: Periodo[]=[];
  listaAsignaturas: Asignatura[]=[]
  listaCursos: Curso[]=[]
  listaHorario = {
    "LUN": "", "MAR":"","MIE":"","JUE":"","VIE":""
  }
  dias=["LUN", "MAR","MIE","JUE","VIE"]


  periodo: number=0;
  departamento: number =0;
  asignatura: number = 0;

  ngOnInit() {
    this.getPeriodos()
    this.getDepartamentos()
  }

  Filtrar(){
    console.log("asignatira:"+this.asignatura)
    if(this.busqueda.valid && this.asignatura!=0){
      this.getCursos()
      this.buscar=false;
    }else{
      this.buscar=true;
    }
  }

  getDepartamentos(){
    this.listaDepartamentos=[];
    this.service.getDepartamentos().subscribe(res => {
      this.listaDepartamentos.length=0
      res.forEach((element: { codigo: any; nombre: any; }) => {
        this.listaDepartamentos.push({
          codigo: element.codigo,
          nombre: element.nombre
        })
      });
    })
  }


  getPeriodos(){
    this.listaPeriodos=[];
    this.service.getPeriodos().subscribe(res => {
      this.listaPeriodos.length=0
      res.forEach((element: { codigo: any; nombre: any; }) => {
        this.listaPeriodos.push({
          codigo: element.codigo,
          nombre: element.nombre
        })
      });
    })
  }

  seleccion(){
    if(this.departamento != 0 && this.periodo != 0 && this.departamento != undefined && this.periodo != undefined){
      this.getAsignaturas();
    }
  }

  getAsignaturas(){
    this.listaAsignaturas=[]
    this.service.getAsignaturas(this.departamento,this.periodo).subscribe(res => {
      this.listaAsignaturas.length=0
      console.log(res)
      res.forEach((element: { codigo: any; nombre: any; }) => {
        this.listaAsignaturas.push({
          codigo: element.codigo,
          nombre: element.nombre
        })
      });
    })
  }

  getCursos(){
    this.service.getCursos(this.asignatura, this.periodo).subscribe(res => {
      this.listaCursos.length=0
      console.log(res)
      res.forEach((element: { nrc: any; cupo: any; disponible: any; creditos: any; carreras: any; horarios: any; }) => {
        this.listaCursos.push({
          nrc: element.nrc,
          cupo: element.cupo,
          disponible: element.disponible,
          creditos: element.creditos,
          carreras: element.carreras,
          horarios: element.horarios
        })
        element.horarios.forEach((hor:any) => {
          hor.dia == "LUN" ? this.listaHorario.LUN=hor.horaInicio.toString().replace(/.^\:00$/,"")+" - "+hor.horaFin.toString() : null
          hor.dia == "MAR" ? this.listaHorario.MAR=hor.horaInicio.toString()+" - "+hor.horaFin.toString() : null
          hor.dia == "MIE" ? this.listaHorario.MIE=hor.horaInicio.toString()+" - "+hor.horaFin.toString() : null
          hor.dia == "JUE" ? this.listaHorario.JUE=hor.horaInicio.toString()+" - "+hor.horaFin.toString() : null
          hor.dia == "VIE" ? this.listaHorario.VIE=hor.horaInicio.toString()+" - "+hor.horaFin.toString() : null
        });
        
      });
    })
    console.log("Cursos:"+this.listaCursos)
  }

}

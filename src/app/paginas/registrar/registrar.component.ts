import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/model/carrera';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';

interface Estudiante {


}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private route: Router, private service: ServiciosService, private _snackBar: MatSnackBar) { }

  registrar = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    identificacion: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    career:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required])
  });

  carreras: Carrera[] = []

  ngOnInit() {
    this.getCarreras()
  }

  getCarreras(){
    this.carreras=[]
    this.service.obtenerAllCarreras().subscribe(res =>{
      res.forEach((element: { codigo: any; nombre: any; }) => {
        this.carreras.push({
          codigo: element.codigo,
          nombre: element.nombre
        })
        
      });
    })
  }

  registrarse() {
    if (this.registrar.valid) {
    } else {
      this._snackBar.open("Complete todos los campos", "cerrar");
      if (this.registrar.controls['telefono'].value == '') {
        console.log("hola")
      }
    }
  }
}

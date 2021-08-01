import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actualizacion } from 'src/app/model/actualizacion';
import { Estudiante } from 'src/app/model/estudiante';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(private route: Router, private service: ServiciosService, private _snackBar: MatSnackBar) { }

registrar = new FormGroup({
  nombre: new FormControl('', [Validators.required]),
  apellido: new FormControl('', [Validators.required]),
  genero: new FormControl('', [Validators.required]),
  telefono: new FormControl('', [Validators.required]),
  direccion: new FormControl('', [Validators.required])
});

estudiante: Estudiante = new Estudiante

actualizar: Actualizacion = new Actualizacion

ngOnInit() {
  this.getEstudiante()
}


getEstudiante(){
  this.service.obtenerEstudiante(sessionStorage.getItem('correo')).subscribe(res => {
    console.log(res)
    this.estudiante = {
      tipo: res.tipo,
      identificacion: res.tipo,
      nombre: res.nombre,
      apellido: res.apellido,
      correo: res.correo,
      telefono: res.telefono,
      direccion: res.direccion,
      genero: res.genero,
      carrera: res.carrera,
      contraseña: res.contraseña
    }
  })
}


registrarse() {
  if (this.registrar.valid) {
    this.actualizar = {
      nombre: this.registrar.controls['nombre'].value,
      apellido: this.registrar.controls['apellido'].value,
      genero: this.registrar.controls['genero'].value,
      telefono: this.registrar.controls['telefono'].value,
      direccion: this.registrar.controls['direccion'].value
    }
    this.service.actualizarEstudiante(this.estudiante.correo, this.actualizar).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizacion Correcta',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(["principal/matriculas"]);
    }, error =>{
      this._snackBar.open("Hubo un error", "cerrar");
    })
  } else {
    this._snackBar.open("Complete todos los campos", "cerrar");
    if (this.registrar.controls['telefono'].value == '') {
      console.log("hola")
    }
  }
}
}


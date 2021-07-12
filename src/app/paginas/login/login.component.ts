import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) { }

  login = new FormGroup({
    correo: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  ngOnInit() {
  }

  Verificar(){
    console.log(this.login.value);
    if(this.login.valid){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Correcto',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(["principal"]);
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error en Credenciales',
        showConfirmButton: false,
        timer: 1500
      })
      this.login.controls['password'].reset();
      this.login.markAllAsTouched();
    }
    
  }



}

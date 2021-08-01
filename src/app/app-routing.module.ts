import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './paginas/datos/datos.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { MatriculaComponent } from './paginas/matricula/matricula.component';
import { MatriculasComponent } from './paginas/matriculas/matriculas.component';
import { PerfilComponent } from './paginas/Perfil/Perfil.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { RegistrarComponent } from './paginas/registrar/registrar.component';
import { TablaComponent } from './paginas/tabla/tabla.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: "principal", component: PrincipalComponent, children: [
      {
        path: '', component: InicioComponent
      },
      {
        path: 'busqueda', component: TablaComponent
      },
      {
        path: 'matricularse', component: MatriculaComponent
      },
      {
        path: 'matriculas', component: MatriculasComponent
      },
      {
        path: 'datos', component:DatosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

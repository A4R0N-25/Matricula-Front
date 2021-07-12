import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { MatriculaComponent } from './paginas/matricula/matricula.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { TablaComponent } from './paginas/tabla/tabla.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"principal", component:PrincipalComponent,children:[
    {
      path: '', component:MatriculaComponent
    },
    {
      path: 'busqueda', component:TablaComponent
    },
    {
      path: 'matricula', component:MatriculaComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PdfManagerComponent} from './pdf/pdf-manager/pdf-manager.component'

export const routes: Routes = [
    { path: '', component: PdfManagerComponent }, // Establecer como componente de inicio
    // Otras rutas si las tienes...
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

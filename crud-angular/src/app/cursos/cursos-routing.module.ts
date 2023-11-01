import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './Containers/cursos/cursos.component';
import { CursosFormComponent } from './Containers/cursos-form/cursos-form.component';
import { CourseResolver } from './guards/curso.resolver';

const routes: Routes = [
  { path: '', component:CursosComponent },
  { path: 'novo', component:CursosFormComponent, resolve:{ curso: CourseResolver}},
  { path: 'editar/:id', component:CursosFormComponent, resolve:{ curso: CourseResolver} }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

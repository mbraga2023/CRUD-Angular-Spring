import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './Containers/cursos/cursos.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CursosFormComponent } from './Containers/cursos-form/cursos-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosListaComponent } from './components/cursos-lista/cursos-lista.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [CursosComponent, CursosFormComponent, CursosListaComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CursosModule {}

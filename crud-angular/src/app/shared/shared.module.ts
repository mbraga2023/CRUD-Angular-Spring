import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from '../cursos/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AppMaterialModule
  ],
  exports:[
    ErrorDialogComponent,
    CategoryPipe,

  ]
})
export class SharedModule { }

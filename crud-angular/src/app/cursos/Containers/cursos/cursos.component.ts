import { Component, OnInit } from '@angular/core';
import { Cursos } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos$: Observable<Cursos[]>  | null= null; //declaração e inicialização da variável.
  //cursosService: CursosService;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  ngOnInit(): void {}

  refresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar a tabela');
        return of([]);
      })
    );
  }

  onAdd() {
    console.log('onAdd');
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(curso: Cursos) {
    this.router.navigate(['editar', curso._id], { relativeTo: this.route });
  }

  onDelete(curso: Cursos) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.cursosService.remove(curso._id).subscribe({
      next: () => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: error => this.onError('Erro ao remover o curso')
    });
      }
    });

  }



}

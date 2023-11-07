import { Component, OnInit, ViewChild } from '@angular/core';
import { Cursos } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CursosPage } from '../../model/cursosPage';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos$: Observable<CursosPage> | null = null;

  pageIndex = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  ngOnInit() {
    this.refresh();

  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.cursos$ = this.cursosService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          this.onError('Error loading courses.');
          return of({ cursos: [], totalElements: 0 } as CursosPage);
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

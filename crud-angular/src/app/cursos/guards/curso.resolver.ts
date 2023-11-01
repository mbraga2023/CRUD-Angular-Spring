import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { Cursos } from '../model/cursos';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver {

  constructor(private service: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cursos> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id'])
        .pipe(
          catchError(error => {
            console.error(`Error loading course: ${error}`);
            return of({ _id: '', name: '', category: '' });
          })
        );
    }
    return of({ _id: '', name: '', category: '', aulas: [] });
  }
}

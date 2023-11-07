import { Injectable } from '@angular/core';
import { Cursos } from '../model/cursos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first, tap } from 'rxjs';
import { CursosPage } from '../model/cursosPage';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'api/cursos';
  private cache: Cursos[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  list(page = 0, pageSize = 10) {
    return this.httpClient.get<CursosPage>(`${this.API}?pageNumber=${page}&pageSize=${pageSize}`).pipe(
      first(),
      tap(data => (this.cache = data.cursos))
    );
  }

  save(record: Partial<Cursos>){
    if(record._id){
      return this.update(record);
    }
    console.log(record);
    return this.create(record);
  }

  loadById(id: string){
    return this.httpClient.get<Cursos>(`${this.API}/${id}`);
  }

  private create(record: Partial<Cursos>){
    return this.httpClient.post<Cursos>(this.API, record);
  }

  private update(record: Partial<Cursos>){
    return this.httpClient.put<Cursos>(`${this.API}/${record._id}`, record);
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}

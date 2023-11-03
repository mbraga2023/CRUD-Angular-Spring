import { Injectable } from '@angular/core';
import { Cursos } from '../model/cursos';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'api/cursos';
  constructor(
    private httpClient: HttpClient
  ) { }

  list(){
    return this.httpClient.get<Cursos[]>(this.API)//Observable que retorna um array de Cursos
  .pipe(
    first(),
    tap (cursos => console.log(cursos))
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

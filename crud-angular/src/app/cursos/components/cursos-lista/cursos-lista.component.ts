import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cursos } from '../../model/cursos';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent {

  @Input() cursos: Cursos []=[];
  @Output() add = new EventEmitter (false);
  @Output() edit = new EventEmitter (false);
  @Output() remove = new EventEmitter (false);

  displayedColumns = ['name', 'category', 'actions'];

  constructor(

  ){}

  onAdd(){
    //console.log('onAdd');
    this.add.emit(true);
  }

  onEdit(curso: Cursos){
    this.edit.emit(curso);
  }

  onDelete(curso: Cursos){
    this.remove.emit(curso);
  }

}

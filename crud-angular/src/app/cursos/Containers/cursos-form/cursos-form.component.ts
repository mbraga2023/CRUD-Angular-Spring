import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from '../../model/cursos';
import { Aulas } from '../../model/aulas';
import { Subscription } from 'rxjs';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent {
  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const curso: Cursos = this.route.snapshot.data['curso'];
    this.form = this.formBuilder.group({
      _id: [curso._id],
      name: [
        curso.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      category: [curso.category, [Validators.required]],
      aulas: this.formBuilder.array(
        this.obterAulas(curso),
        Validators.required
      ),
    });
  }

  private obterAulas(curso: Cursos) {
    const aulas = [];
    if (curso?.aulas) {
      curso.aulas.forEach((aula) => aulas.push(this.criarAula(aula)));
    } else {
      aulas.push(this.criarAula());
    }
    return aulas;
  }

  private criarAula(aula: Aulas = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [aula.id],
      name: [
        aula.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        aula.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  onSubmit() {
    // Check if the form is valid and category is not null or "null"
    if (
      this.form.valid &&
      this.form.value.category &&
      this.form.value.category !== 'null'
    ) {
      this.service.save(this.form.value).subscribe({
        next: (result) => this.onSuccess(),
        error: (error) => this.onError(),
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
      this.snackBar.open(
        'Por favor, preencha todos os campos corretamente.',
        '',
        { duration: 5000 }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', '', { duration: 5000 });
    this.onCancel();
  }

  getAulasFormArray() {
    return (<UntypedFormArray>this.form.get('aulas')).controls;
  }

  addAula() {
    const aulas = this.form.get('aulas') as UntypedFormArray;
    aulas.push(this.criarAula());
  }

  removeAula(index: number) {
    const aulas = this.form.get('aulas') as UntypedFormArray;
    aulas.removeAt(index);
  }

}

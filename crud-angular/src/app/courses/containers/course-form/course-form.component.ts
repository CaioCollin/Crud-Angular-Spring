import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    id: [''],

    name: ['' , 
    [Validators.required ,
    Validators.minLength(5),
    Validators.maxLength(155)]
    ],
    
    category: ['', [Validators.required]]
  });
  
  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){
      const course: Course = this.route.snapshot.data['course'];

      this.form.setValue({
        id: course.id, 
        name: course.name,
        category: course.category
      })
  }

  onSubmit(){
   this.service.save(this.form.value)
   .subscribe(result => this.onSuccess(), error => this.onError());
  }


  onCancel(){
    this.location.back();
  }

  private onError(){
    this._snackBar.open("Erro ao salvar curses", '',{duration: 3000});
  }

  private onSuccess(){
    this._snackBar.open("Curso salvo com Sucesso!", '',{duration: 3000});
    this.location.back();
  }


  getErrorMessage(fieldname : string){
    const field = this.form.get(fieldname);

    if(field?.hasError('required')){
        return 'Campo obrigatório !';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 150;
      return `Tamanho maximo usado de ${requiredLength} caracteres`;
    }


    return 'Campo Inválido';
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponentComponent } from 'src/app/shared/components/confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null= null;
 

  //CoursesService: CoursesService;

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route:  ActivatedRoute,
    private _snackBar: MatSnackBar,
    ) {
      this.refresh();
  }

  refresh(){
    this.courses$ = this.CoursesService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro aocarregar cursos.');
          return of([])
        })
      );
  }
  

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd(){
    this.router.navigate(['new'] , {relativeTo: this.route})
  }

  onEdit(course : Course){
    this.router.navigate(['edit', course.id] , {relativeTo: this.route});
  }

  onRemove(course : Course){

    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      data:  'Tem certeza que deseja remover curso ?',
    });

    dialogRef.afterClosed().subscribe( (result:boolean)=> {
      if(result){
        this.CoursesService.romove(course.id).subscribe(
          () => {
            this.refresh();
            this._snackBar.open("Curso removido com sucesso!", 'X',{
              duration: 3000,
              verticalPosition : `top`,
              horizontalPosition : `center` 
            });
          },
          () => this.onError(`erro ao tentar remover curso`)
        );
      }
    });

  }
}

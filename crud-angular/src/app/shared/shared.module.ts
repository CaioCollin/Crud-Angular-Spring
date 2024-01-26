import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponentComponent } from './components/confirmation-dialog-component/confirmation-dialog-component.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponentComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponentComponent
  ]
})
export class SharedModule { }

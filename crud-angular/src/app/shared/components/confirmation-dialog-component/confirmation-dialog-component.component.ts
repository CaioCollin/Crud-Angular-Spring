import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-component',
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrls: ['./confirmation-dialog-component.component.scss']
})
export class ConfirmationDialogComponentComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onConfirm(result : boolean): void {
    this.dialogRef.close(result);
  }
}

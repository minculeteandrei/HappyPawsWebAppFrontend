import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAction, Resource } from 'src/common-modules/interfaces/interface';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {
  resource = Resource;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {action: DialogAction, resourceName: Resource}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

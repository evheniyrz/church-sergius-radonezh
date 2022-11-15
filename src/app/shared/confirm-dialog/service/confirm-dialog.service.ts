import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../component/confirm-dialog.component';
import { ConfirmDialogConfiguration } from '../models/confirm-dialog-configuration.model';

@Injectable()
export class ConfirmDialogService {

  private confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  private defaultConfig: MatDialogConfig = { width: '350px', disableClose: true };

  constructor(private dialog: MatDialog) { }

  public confirmDialogOpen(configuration: ConfirmDialogConfiguration) {

    this.defaultConfig = {
      ...this.defaultConfig,
      ...configuration
    };

    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, this.defaultConfig);
  }

  public afterConfirmDialogClosed(): Observable<any> {
    return this.confirmDialogRef.afterClosed();
  }
}

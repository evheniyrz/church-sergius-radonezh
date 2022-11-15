import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmDialogConfiguration } from 'src/app/shared/confirm-dialog/models/confirm-dialog-configuration.model';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/service/confirm-dialog.service';

@Component({
  selector: 'app-table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent implements OnInit {

  @Input() contentID!: string;
  @Output() onDeleteItem: EventEmitter<{ contentId: string; }> = new EventEmitter();

  public isChecked = false;

  constructor(private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
  }

  public deleteItem(itemId: string): void {
    const config: ConfirmDialogConfiguration = {
      data: {
        text: 'Вы уверены что хотите удалить элемент из списка?'
      }
    };
    this.dialogService.confirmDialogOpen(config);
    const subscription: Subscription = this.dialogService.afterConfirmDialogClosed()
      .subscribe(
        {
          next: (isConfirmed) => {
            if (isConfirmed) {
              this.onDeleteItem.emit({ contentId: itemId })
            }

            if (null != subscription) {
              subscription.unsubscribe();
            }
          }
        }
      );
  }

}

import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimetablesEditorComponent } from './timetables-editor/timetables-editor.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { ContentResolver } from './services/content/content.resolver';
import { CloudinaryModule } from '@cloudinary/ng';
import { ContentTableComponent } from './content-table/content-table.component';
import { TableActionComponent } from './content-table/components/table-action/table-action.component';
import { ConfirmDialogComponent } from './confirm-dialog/component/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/service/confirm-dialog.service';


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}

@NgModule(
  {
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatIconModule,
      ClipboardModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSlideToggleModule,
      MatDialogModule,
      NgxEditorModule.forChild({
        locals: {
          // menu
          bold: 'Bold',
          italic: 'Italic',
          code: 'Code',
          blockquote: 'Blockquote',
          underline: 'Underline',
          strike: 'Strike',
          bullet_list: 'Bullet List',
          ordered_list: 'Ordered List',
          heading: 'Heading',
          h1: 'Header 1',
          h2: 'Header 2',
          h3: 'Header 3',
          h4: 'Header 4',
          h5: 'Header 5',
          h6: 'Header 6',
          align_left: 'Left Align',
          align_center: 'Center Align',
          align_right: 'Right Align',
          align_justify: 'Justify',
          text_color: 'Text Color',
          background_color: 'Background Color',

          // popups, forms, others...
          url: 'URL',
          text: 'Text',
          openInNewTab: 'Open in new tab',
          insert: 'Insert',
          altText: 'Alt Text',
          title: 'Title',
          remove: 'Remove',
        },
      }),
      CloudinaryModule
    ],
    declarations: [
      LoginFormComponent,
      EditorComponent,
      GridListComponent,
      TimetablesEditorComponent,
      ContentListComponent,
      ContentViewerComponent,
      ContentTableComponent,
      TableActionComponent,
      ConfirmDialogComponent,
    ],
    exports: [
      MatButtonModule,
      MatIconModule,
      LoginFormComponent,
      EditorComponent,
      GridListComponent,
      TimetablesEditorComponent,
      ContentListComponent,
      ContentViewerComponent,
    ],
    providers: [
      MatDatepickerModule,
      ContentResolver,
      { provide: DateAdapter, useClass: CustomDateAdapter },
      ConfirmDialogService
    ]
  }
)
export class SharedModule { }
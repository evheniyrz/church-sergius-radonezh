import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimetablesEditorComponent } from './timetables-editor/timetables-editor.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarViewerComponent } from './calendar-viewer/calendar-viewer.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { ContentResolver } from './services/content/content.resolver';


@NgModule(
  {
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatIconModule,
      ClipboardModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatNativeDateModule,
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
      })
    ],
    declarations: [
      LoginFormComponent,
      EditorComponent,
      GridListComponent,
      TimetablesEditorComponent,
      CalendarComponent,
      CalendarViewerComponent,
      ContentListComponent,
      ContentViewerComponent,
    ],
    exports: [
      MatButtonModule,
      MatIconModule,
      LoginFormComponent,
      EditorComponent,
      GridListComponent,
      TimetablesEditorComponent,
      CalendarComponent,
      CalendarViewerComponent,
      ContentListComponent,
      ContentViewerComponent,
    ],
    providers: [
      MatDatepickerModule,
      ContentResolver
    ]
  }
)
export class SharedModule { }
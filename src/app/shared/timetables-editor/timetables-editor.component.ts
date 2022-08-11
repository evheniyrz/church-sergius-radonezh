import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { postContentAction, updateContent, updateTimetable } from 'src/app/root-store/content-store/content.actions';
import { Content, ContentType, TimetableContent } from 'src/app/root-store/content-store/model/content.model';
import { UserLoginState } from 'src/app/root-store/user-login-store/models/login-payload.model';
import { CustomErrorStateMatcher } from '../error-state-matcher/custom-error-state-matcher';

export interface WeeklyTimetableFormValue {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  timetables: {
    date: string;
    description: {
      hours: string;
      minutes: string;
      text: string;
    }[];
  }[]
}
@Component({
  selector: 'app-timetables-editor',
  templateUrl: './timetables-editor.component.html',
  styleUrls: ['./timetables-editor.component.scss']
})
export class TimetablesEditorComponent implements OnInit {

  @Input() contentConfig?: { userData: UserLoginState | null | undefined; sectionId: string; }
  @Input() set contentToEdit(editorContent: Content | null | undefined) {
    if (null != editorContent) {
      this.timeTablesForm.removeControl('weeklyTimetable');
      this.timeTablesForm = this.frmBuilder.group({ weeklyTimetable: this.frmBuilder.array([this.generateWeeklyTimetable(editorContent.content.editorContent.content as TimetableContent)]) });
      this.isContentUnderEditing = true;
      this.editedContentId = editorContent.id;
    }
  }

  public timeTablesForm: FormGroup;

  public matcher = new CustomErrorStateMatcher();

  public hourSelectList: string[] = Array.from({ length: 24 }, (_, index) => {
    return index === 0 ? `${index}0` : index > 0 && index < 10 ? `0${index}` : `${index}`
  });

  public minuteSelectList: string[] = Array.from({ length: 60 }, (_, index) => {
    return index === 0 ? `${index}0` : index > 0 && index < 10 ? `0${index}` : `${index}`
  });

  public isContentUnderEditing = false;


  private editedContentId: string | null | undefined = null;
  constructor(
    private frmBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private store: Store) {
    this.dateAdapter.setLocale('ru');

    this.timeTablesForm = this.frmBuilder.group(
      {
        weeklyTimetable: this.frmBuilder.array([this.generateWeeklyTimetable()])
      },
      {
        updateOn: 'submit'
      }
    );
  }

  get weeklyTimetable(): FormArray {
    return this.timeTablesForm.get('weeklyTimetable') as FormArray;
  }

  get weeklyTimetableGroups(): FormGroup[] {
    return this.weeklyTimetable.controls as FormGroup[];
  }

  ngOnInit(): void {

  }

  /**
   * getTimetableGroups(weaklyGroupIndex)  */
  public getTimetableGroups(weaklyGroupIndex: number): FormGroup[] {
    return ((this.weeklyTimetable.at(weaklyGroupIndex).get('timetables') as FormArray).controls as FormGroup[]);
  }

  /**
   * getFormControl
   * @returns FormControl
   */
  public getFormControl(formGroup: FormGroup, controlName: string): FormControl {
    return formGroup.get(controlName) as FormControl;
  }

  /**
   * getGroupArray
   */
  public getGroupArray(group: FormGroup, groupName: string): FormArray {
    return group.get(groupName) as FormArray;
  }

  /**
   * saveTimeTable
   */
  public saveTimeTable(): void {
    if (null != this.timeTablesForm && this.timeTablesForm.valid && null != this.contentConfig?.userData) {
      const content: Content[] = (this.timeTablesForm.value.weeklyTimetable as WeeklyTimetableFormValue[]).map((element: WeeklyTimetableFormValue) => {
        return {
          author: this.contentConfig?.userData?.name,
          authorId: this.contentConfig?.userData?.id,
          contentType: this.contentConfig?.sectionId as ContentType,
          content: {
            editorContent: {
              content: {
                ...element
              },
              type: 'formGroupValue'
            }
          }
        } as Content;
      });

      this.store.dispatch(postContentAction({ content, sectionId: this.contentConfig.sectionId }));
    }
  }

  /**
   * updateTimetable
 : void  */
  public updateTimetable(): void {
    if (null != this.editedContentId && null != this.timeTablesForm && this.timeTablesForm.valid && null != this.contentConfig?.userData) {
      this.store.dispatch(updateContent(
        {
          content: {
            content: {
              editorContent: {
                content: this.timeTablesForm.value.weeklyTimetable[0],
                type: 'formGroupValue'
              }
            },
            updatedAt: Date.now()
          } as Content,
          contentId: this.editedContentId,
          sectionId: this.contentConfig.sectionId
        }));
    }
  }

  /**
   * addWeekTimetable
   */
  public addWeekTimetable(): void {
    this.weeklyTimetable.push(this.generateWeeklyTimetable());
  }

  /**
   * removeWeekTimetable
   */
  public removeWeekTimetable(index: number): void {
    this.weeklyTimetable.removeAt(index);
  }

  public addDescription(descriptionGroup: FormGroup): void {
    (descriptionGroup.get('description') as FormArray).push(this.generateDescriptionGroup());
  }

  /**
   * removeDescription
   */
  public removeDescription(descriptionGroup: FormGroup): void {
    const descriptionFormGroupArray: FormArray = (descriptionGroup.get('description') as FormArray);
    descriptionFormGroupArray.removeAt(descriptionFormGroupArray.controls.length - 1);
  }

  public getDescriptionFormGroupArray(formGroup: FormGroup): FormGroup[] {
    return (formGroup.get('description') as FormArray).controls as FormGroup[];
  }

  public addNewDate(weeklyGroupIndex: number): void {
    (this.weeklyTimetable.at(weeklyGroupIndex).get('timetables') as FormArray).push(this.generateTimetableForm());
  }

  public removeCurrentDate(weeklyGroupIndex: number, formIndex: number): void {
    (this.weeklyTimetable.at(weeklyGroupIndex).get('timetables') as FormArray)
      .removeAt(formIndex);
  }

  private generateDescriptionGroup(descriptionItem: { hours: string; minutes: string; text: string } = {
    hours: '00',
    minutes: '00',
    text: ''
  }): FormGroup {
    const timetableDescriptionGroup: FormGroup = this.frmBuilder.group({
      hours: this.frmBuilder.control(descriptionItem.hours, Validators.required),
      minutes: this.frmBuilder.control(descriptionItem.minutes, Validators.required),
      text: this.frmBuilder.control(descriptionItem.text, [Validators.required, Validators.minLength(5)])
    });

    return timetableDescriptionGroup;
  }

  private generateTimetableForm(
    itemValue: { date: string; description: { hours: string; minutes: string; text: string; }[] } =
      {
        date: '',
        description: [{
          hours: '00',
          minutes: '00',
          text: ''
        }]
      }): FormGroup {
    const timetableForm: FormGroup = this.frmBuilder.group({
      date: this.frmBuilder.control(itemValue.date, Validators.required),
      description: this.frmBuilder.array(itemValue.description.map((descriptionItem) => this.generateDescriptionGroup(descriptionItem)))
    });

    return timetableForm;
  }

  private generateWeeklyTimetable(
    value: WeeklyTimetableFormValue = {
      dateRange: {
        startDate: '',
        endDate: ''
      },
      timetables: [
        {
          date: '',
          description: [{
            hours: '',
            minutes: '',
            text: ''
          }]
        }
      ]
    }): FormGroup {
    const weeklyTimetable: FormGroup = this.frmBuilder.group({
      dateRange: this.frmBuilder.group({
        startDate: this.frmBuilder.control(value?.dateRange.startDate, Validators.required),
        endDate: this.frmBuilder.control(value?.dateRange.endDate, Validators.required)
      }),
      timetables: this.frmBuilder.array(value.timetables.map((itemValue) => this.generateTimetableForm(itemValue)))
    });

    return weeklyTimetable;
  }

}

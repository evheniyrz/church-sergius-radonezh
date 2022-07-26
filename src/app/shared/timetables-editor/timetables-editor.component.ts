import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { CustomErrorStateMatcher } from '../error-state-matcher/custom-error-state-matcher';

@Component({
  selector: 'app-timetables-editor',
  templateUrl: './timetables-editor.component.html',
  styleUrls: ['./timetables-editor.component.scss']
})
export class TimetablesEditorComponent implements OnInit {

  public timeTablesForm: FormGroup;

  public matcher = new CustomErrorStateMatcher();

  public hourSelectList: string[] = Array.from({ length: 24 }, (_, index) => {
    return index === 0 ? `${index}0` : index > 0 && index < 10 ? `0${index}` : `${index}`
  });

  public minuteSelectList: string[] = Array.from({ length: 60 }, (_, index) => {
    return index === 0 ? `${index}0` : index > 0 && index < 10 ? `0${index}` : `${index}`
  });
  constructor(private frmBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('ru');

    this.timeTablesForm = this.frmBuilder.group(
      {
        timetables: this.frmBuilder.array([this.generateTimetableForm()])
      },
      {
        updateOn: 'submit'
      }
    );
  }

  get timetables(): FormArray {
    return this.timeTablesForm.get('timetables') as FormArray;
  }

  get timetablesControls(): FormGroup[] {
    return this.timetables.controls as FormGroup[];
  }

  ngOnInit(): void {
  }

  /**
   * saveTimeTable
   */
  public saveTimeTable(): void {
    // if (this.timeTablesForm.valid) {
    console.log('%c FORM VALUE', 'color: blue', this.timeTablesForm);
    // }
  }

  public addDescription(formIndex: number): void {
    (this.timetables.at(formIndex).get('description') as FormArray).push(this.generateDescriptionGroup());
  }

  /**
   * removeDescription
   */
  public removeDescription(formIndex: number): void {
    (this.timetables.at(formIndex).get('description') as FormArray).removeAt(this.timetables.controls.length - 1);
  }

  public getDescriptionFormGroupArray(formGroup: FormGroup): FormGroup[] {
    return (formGroup.get('description') as FormArray).controls as FormGroup[];
  }

  public addNewDate(): void {
    this.timetables.push(this.generateTimetableForm());
  }

  public removeCurrentDate(formIndex: number): void {
    this.timetables.removeAt(formIndex);
  }

  /**
   * getFormControl
   * @returns FormControl
   */
  public getFormControl(formGroup: FormGroup, controlName: string): FormControl {
    return formGroup.get(controlName) as FormControl;
  }

  private generateDescriptionGroup(): FormGroup {
    const timetableDescriptionGroup: FormGroup = this.frmBuilder.group({
      hours: this.frmBuilder.control('00', Validators.required),
      minutes: this.frmBuilder.control('00', Validators.required),
      text: this.frmBuilder.control('', [Validators.required, Validators.minLength(5)])
    });

    return timetableDescriptionGroup;
  }

  private generateTimetableForm(): FormGroup {
    const timetableForm: FormGroup = this.frmBuilder.group({
      date: this.frmBuilder.control('', Validators.required),
      description: this.frmBuilder.array([this.generateDescriptionGroup()])
    });

    return timetableForm;
  }

}

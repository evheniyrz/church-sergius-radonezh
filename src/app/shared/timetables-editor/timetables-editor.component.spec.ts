import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablesEditorComponent } from './timetables-editor.component';

describe('TimetablesEditorComponent', () => {
  let component: TimetablesEditorComponent;
  let fixture: ComponentFixture<TimetablesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetablesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetablesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

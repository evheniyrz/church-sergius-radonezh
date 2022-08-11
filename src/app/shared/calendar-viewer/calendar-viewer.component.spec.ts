import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewerComponent } from './calendar-viewer.component';

describe('CalendarViewerComponent', () => {
  let component: CalendarViewerComponent;
  let fixture: ComponentFixture<CalendarViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

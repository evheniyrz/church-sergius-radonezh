import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';

describe('ForontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

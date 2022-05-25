import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageHeaderComponent } from './public-page-header.component';

describe('PublicPageHeaderComponent', () => {
  let component: PublicPageHeaderComponent;
  let fixture: ComponentFixture<PublicPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

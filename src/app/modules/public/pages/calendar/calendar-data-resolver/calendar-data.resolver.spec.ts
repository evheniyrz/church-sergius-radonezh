import { TestBed } from '@angular/core/testing';

import { CalendarDataResolver } from './calendar-data.resolver';

describe('CalendarDataResolver', () => {
  let resolver: CalendarDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CalendarDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

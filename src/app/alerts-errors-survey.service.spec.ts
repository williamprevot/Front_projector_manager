import { TestBed } from '@angular/core/testing';

import { AlertsErrorsSurveyService } from './alerts-errors-survey.service';

describe('AlertsErrorsSurveyService', () => {
  let service: AlertsErrorsSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsErrorsSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CinemaCreationService } from './cinema-creation.service';

describe('CinemaCreationService', () => {
  let service: CinemaCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

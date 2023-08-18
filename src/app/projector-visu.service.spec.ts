import { TestBed } from '@angular/core/testing';

import { ProjectorVisuService } from './projector-visu.service';

describe('ProjectorVisuService', () => {
  let service: ProjectorVisuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectorVisuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

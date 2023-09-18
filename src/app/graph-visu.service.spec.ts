import { TestBed } from '@angular/core/testing';

import { GraphVisuService } from './graph-visu.service';

describe('GraphVisuService', () => {
  let service: GraphVisuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphVisuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

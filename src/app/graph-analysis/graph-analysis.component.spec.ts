import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnalysisComponent } from './graph-analysis.component';

describe('GraphAnalysisComponent', () => {
  let component: GraphAnalysisComponent;
  let fixture: ComponentFixture<GraphAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphAnalysisComponent]
    });
    fixture = TestBed.createComponent(GraphAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

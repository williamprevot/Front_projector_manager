import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorDetailComponent } from './projector-detail.component';

describe('ProjectorDetailComponent', () => {
  let component: ProjectorDetailComponent;
  let fixture: ComponentFixture<ProjectorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectorDetailComponent]
    });
    fixture = TestBed.createComponent(ProjectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorStatusListComponent } from './projector-status-list.component';

describe('ProjectorStatusListComponent', () => {
  let component: ProjectorStatusListComponent;
  let fixture: ComponentFixture<ProjectorStatusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectorStatusListComponent]
    });
    fixture = TestBed.createComponent(ProjectorStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

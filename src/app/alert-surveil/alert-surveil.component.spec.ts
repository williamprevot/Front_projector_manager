import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSurveilComponent } from './alert-surveil.component';

describe('AlertSurveilComponent', () => {
  let component: AlertSurveilComponent;
  let fixture: ComponentFixture<AlertSurveilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertSurveilComponent]
    });
    fixture = TestBed.createComponent(AlertSurveilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

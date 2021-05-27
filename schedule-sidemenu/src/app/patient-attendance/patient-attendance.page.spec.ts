import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientAttendancePage } from './patient-attendance.page';

describe('PatientAttendancePage', () => {
  let component: PatientAttendancePage;
  let fixture: ComponentFixture<PatientAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAttendancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

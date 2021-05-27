import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttendanceListPage } from './attendance-list.page';

describe('AttendanceListPage', () => {
  let component: AttendanceListPage;
  let fixture: ComponentFixture<AttendanceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

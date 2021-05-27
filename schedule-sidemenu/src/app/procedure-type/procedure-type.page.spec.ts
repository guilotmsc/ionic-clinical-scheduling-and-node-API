import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcedureTypePage } from './procedure-type.page';

describe('ProcedureTypePage', () => {
  let component: ProcedureTypePage;
  let fixture: ComponentFixture<ProcedureTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcedureTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

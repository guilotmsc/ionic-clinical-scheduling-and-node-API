import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcedureTypeListPage } from './procedure-type-list.page';

describe('ProcedureTypeListPage', () => {
  let component: ProcedureTypeListPage;
  let fixture: ComponentFixture<ProcedureTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureTypeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcedureTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

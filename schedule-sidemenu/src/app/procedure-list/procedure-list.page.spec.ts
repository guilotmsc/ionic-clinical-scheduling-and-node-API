import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcedureListPage } from './procedure-list.page';

describe('ProcedureListPage', () => {
  let component: ProcedureListPage;
  let fixture: ComponentFixture<ProcedureListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcedureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

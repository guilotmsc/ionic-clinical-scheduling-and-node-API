import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgreementListPage } from './agreement-list.page';

describe('AgreementListPage', () => {
  let component: AgreementListPage;
  let fixture: ComponentFixture<AgreementListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgreementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

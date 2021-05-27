import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgreementTypePage } from './agreement-type.page';

describe('AgreementTypePage', () => {
  let component: AgreementTypePage;
  let fixture: ComponentFixture<AgreementTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgreementTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

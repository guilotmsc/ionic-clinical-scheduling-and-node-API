import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonEditPage } from './person-edit.page';

describe('PersonEditPage', () => {
  let component: PersonEditPage;
  let fixture: ComponentFixture<PersonEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

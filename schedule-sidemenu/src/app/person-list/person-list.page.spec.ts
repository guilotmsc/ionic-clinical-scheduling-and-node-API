import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonListPage } from './person-list.page';

describe('PersonListPage', () => {
  let component: PersonListPage;
  let fixture: ComponentFixture<PersonListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

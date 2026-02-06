import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccountadministrationComponent } from './useraccountadministration.component';

describe('UseraccountadministrationComponent', () => {
  let component: UseraccountadministrationComponent;
  let fixture: ComponentFixture<UseraccountadministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraccountadministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccountadministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetofcontactinfodataComponent } from './setofcontactinfodata.component';

describe('SetofcontactinfodataComponent', () => {
  let component: SetofcontactinfodataComponent;
  let fixture: ComponentFixture<SetofcontactinfodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetofcontactinfodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetofcontactinfodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

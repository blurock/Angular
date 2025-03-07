import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetofauthorsComponent } from './setofauthors.component';

describe('SetofauthorsComponent', () => {
  let component: SetofauthorsComponent;
  let fixture: ComponentFixture<SetofauthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetofauthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetofauthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

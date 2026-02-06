import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoffirestoreidsComponent } from './listoffirestoreids.component';

describe('ListoffirestoreidsComponent', () => {
  let component: ListoffirestoreidsComponent;
  let fixture: ComponentFixture<ListoffirestoreidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListoffirestoreidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoffirestoreidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

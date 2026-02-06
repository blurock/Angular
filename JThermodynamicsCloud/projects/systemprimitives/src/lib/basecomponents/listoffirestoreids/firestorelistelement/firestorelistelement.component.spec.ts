import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestorelistelementComponent } from './firestorelistelement.component';

describe('FirestorelistelementComponent', () => {
  let component: FirestorelistelementComponent;
  let fixture: ComponentFixture<FirestorelistelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirestorelistelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestorelistelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

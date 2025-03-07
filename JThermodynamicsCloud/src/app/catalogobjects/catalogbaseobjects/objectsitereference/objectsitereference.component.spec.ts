import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsitereferenceComponent } from './objectsitereference.component';

describe('ObjectsitereferenceComponent', () => {
  let component: ObjectsitereferenceComponent;
  let fixture: ComponentFixture<ObjectsitereferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsitereferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsitereferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

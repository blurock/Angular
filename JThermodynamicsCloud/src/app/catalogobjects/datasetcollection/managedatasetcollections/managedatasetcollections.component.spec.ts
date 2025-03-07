import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedatasetcollectionsComponent } from './managedatasetcollections.component';

describe('ManagedatasetcollectionsComponent', () => {
  let component: ManagedatasetcollectionsComponent;
  let fixture: ComponentFixture<ManagedatasetcollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedatasetcollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedatasetcollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

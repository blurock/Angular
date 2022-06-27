import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedatasetrepositoryfilestagingComponent } from './managedatasetrepositoryfilestaging.component';

describe('ManagedatasetrepositoryfilestagingComponent', () => {
  let component: ManagedatasetrepositoryfilestagingComponent;
  let fixture: ComponentFixture<ManagedatasetrepositoryfilestagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedatasetrepositoryfilestagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedatasetrepositoryfilestagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

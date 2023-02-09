import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasepersonComponent } from './databaseperson.component';

describe('DatabasepersonComponent', () => {
  let component: DatabasepersonComponent;
  let fixture: ComponentFixture<DatabasepersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasepersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasepersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

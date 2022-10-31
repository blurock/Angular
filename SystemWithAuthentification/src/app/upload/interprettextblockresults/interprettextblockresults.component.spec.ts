import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterprettextblockresultsComponent } from './interprettextblockresults.component';

describe('InterprettextblockresultsComponent', () => {
  let component: InterprettextblockresultsComponent;
  let fixture: ComponentFixture<InterprettextblockresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterprettextblockresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterprettextblockresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

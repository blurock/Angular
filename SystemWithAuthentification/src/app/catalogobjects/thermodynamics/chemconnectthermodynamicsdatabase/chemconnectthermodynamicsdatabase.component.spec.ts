import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemconnectthermodynamicsdatabaseComponent } from './chemconnectthermodynamicsdatabase.component';

describe('ChemconnectthermodynamicsdatabaseComponent', () => {
  let component: ChemconnectthermodynamicsdatabaseComponent;
  let fixture: ComponentFixture<ChemconnectthermodynamicsdatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemconnectthermodynamicsdatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemconnectthermodynamicsdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

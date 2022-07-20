import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorythermopartitionblockComponent } from './repositorythermopartitionblock.component';

describe('RepositorythermopartitionblockComponent', () => {
  let component: RepositorythermopartitionblockComponent;
  let fixture: ComponentFixture<RepositorythermopartitionblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorythermopartitionblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorythermopartitionblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

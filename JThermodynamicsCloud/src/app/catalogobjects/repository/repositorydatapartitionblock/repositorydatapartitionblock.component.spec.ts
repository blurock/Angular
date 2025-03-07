import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorydatapartitionblockComponent } from './repositorydatapartitionblock.component';

describe('RepositorydatapartitionblockComponent', () => {
  let component: RepositorydatapartitionblockComponent;
  let fixture: ComponentFixture<RepositorydatapartitionblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorydatapartitionblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorydatapartitionblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorydatafileComponent } from './repositorydatafile.component';

describe('RepositorydatafileComponent', () => {
  let component: RepositorydatafileComponent;
  let fixture: ComponentFixture<RepositorydatafileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorydatafileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorydatafileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialreadinofrepositoryfileeventComponent } from './initialreadinofrepositoryfileevent.component';

describe('InitialreadinofrepositoryfileeventComponent', () => {
  let component: InitialreadinofrepositoryfileeventComponent;
  let fixture: ComponentFixture<InitialreadinofrepositoryfileeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialreadinofrepositoryfileeventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialreadinofrepositoryfileeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

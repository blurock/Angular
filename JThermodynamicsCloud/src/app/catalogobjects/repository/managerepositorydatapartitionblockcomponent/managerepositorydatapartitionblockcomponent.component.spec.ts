import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerepositorydatapartitionblockcomponentComponent } from './managerepositorydatapartitionblockcomponent.component';

describe('ManagerepositorydatapartitionblockcomponentComponent', () => {
  let component: ManagerepositorydatapartitionblockcomponentComponent;
  let fixture: ComponentFixture<ManagerepositorydatapartitionblockcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerepositorydatapartitionblockcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerepositorydatapartitionblockcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

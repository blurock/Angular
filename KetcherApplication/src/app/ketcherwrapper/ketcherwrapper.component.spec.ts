import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetcherwrapperComponent } from './ketcherwrapper.component';

describe('KetcherwrapperComponent', () => {
  let component: KetcherwrapperComponent;
  let fixture: ComponentFixture<KetcherwrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KetcherwrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KetcherwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpledatabaseobjectstructureComponent } from './simpledatabaseobjectstructure.component';

describe('SimpledatabaseobjectstructureComponent', () => {
  let component: SimpledatabaseobjectstructureComponent;
  let fixture: ComponentFixture<SimpledatabaseobjectstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpledatabaseobjectstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpledatabaseobjectstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

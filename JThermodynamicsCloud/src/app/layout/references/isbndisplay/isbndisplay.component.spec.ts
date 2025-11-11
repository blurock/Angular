import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbndisplayComponent } from './isbndisplay.component';

describe('IsbndisplayComponent', () => {
  let component: IsbndisplayComponent;
  let fixture: ComponentFixture<IsbndisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsbndisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsbndisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

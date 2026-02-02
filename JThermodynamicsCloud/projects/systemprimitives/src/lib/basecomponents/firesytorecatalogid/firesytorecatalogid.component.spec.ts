import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiresytorecatalogidComponent } from './firesytorecatalogid.component';

describe('FiresytorecatalogidComponent', () => {
  let component: FiresytorecatalogidComponent;
  let fixture: ComponentFixture<FiresytorecatalogidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiresytorecatalogidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiresytorecatalogidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

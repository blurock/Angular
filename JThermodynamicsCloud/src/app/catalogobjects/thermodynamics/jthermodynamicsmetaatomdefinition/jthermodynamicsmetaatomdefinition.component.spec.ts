import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicsmetaatomdefinitionComponent } from './jthermodynamicsmetaatomdefinition.component';

describe('JthermodynamicsmetaatomdefinitionComponent', () => {
  let component: JthermodynamicsmetaatomdefinitionComponent;
  let fixture: ComponentFixture<JthermodynamicsmetaatomdefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicsmetaatomdefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicsmetaatomdefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

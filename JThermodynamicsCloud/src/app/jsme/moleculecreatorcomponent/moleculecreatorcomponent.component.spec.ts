import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculecreatorcomponentComponent } from './moleculecreatorcomponent.component';

describe('MoleculecreatorcomponentComponent', () => {
  let component: MoleculecreatorcomponentComponent;
  let fixture: ComponentFixture<MoleculecreatorcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculecreatorcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculecreatorcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

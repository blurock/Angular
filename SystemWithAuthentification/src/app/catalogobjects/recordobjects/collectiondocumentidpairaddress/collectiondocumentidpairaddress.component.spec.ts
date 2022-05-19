import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiondocumentidpairaddressComponent } from './collectiondocumentidpairaddress.component';

describe('CollectiondocumentidpairaddressComponent', () => {
  let component: CollectiondocumentidpairaddressComponent;
  let fixture: ComponentFixture<CollectiondocumentidpairaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectiondocumentidpairaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiondocumentidpairaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

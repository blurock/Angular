import { TestBed } from '@angular/core/testing';

import { FileformatmanagerService } from './fileformatmanager.service';

describe('FileformatmanagerService', () => {
  let service: FileformatmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileformatmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

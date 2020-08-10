import { TestBed } from '@angular/core/testing';

import { SynchronizeService } from './synchronize.service';

describe('SynchronizeService', () => {
  let service: SynchronizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynchronizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

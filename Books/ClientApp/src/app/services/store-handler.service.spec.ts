import { TestBed } from '@angular/core/testing';

import { StoreHandlerService } from './store-handler.service';

describe('StoreHandlerService', () => {
  let service: StoreHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

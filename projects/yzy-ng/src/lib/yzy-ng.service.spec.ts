import { TestBed } from '@angular/core/testing';

import { YzyNgService } from './yzy-ng.service';

describe('YzyNgService', () => {
  let service: YzyNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YzyNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

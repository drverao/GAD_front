import { TestBed } from '@angular/core/testing';

import { SubcriteriosService } from './subcriterios.service';

describe('SubcriteriosService', () => {
  let service: SubcriteriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcriteriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AsignacionResponsableService } from './asignacion-responsable.service';

describe('AsignacionResponsableService', () => {
  let service: AsignacionResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

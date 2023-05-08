import { TestBed } from '@angular/core/testing';

import { AsignacionCriterioService } from './asignacion-criterio.service';

describe('AsignacionCriterioService', () => {
  let service: AsignacionCriterioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionCriterioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

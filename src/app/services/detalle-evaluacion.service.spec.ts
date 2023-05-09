import { TestBed } from '@angular/core/testing';

import { DetalleEvaluacionService } from './detalle-evaluacion.service';

describe('DetalleEvaluacionService', () => {
  let service: DetalleEvaluacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleEvaluacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

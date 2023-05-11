import { TestBed } from '@angular/core/testing';

import { EvaluarCuantitativaService } from './evaluar-cuantitativa.service';

describe('EvaluarCuantitativaService', () => {
  let service: EvaluarCuantitativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluarCuantitativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

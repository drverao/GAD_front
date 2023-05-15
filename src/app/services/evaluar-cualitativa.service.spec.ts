import { TestBed } from '@angular/core/testing';

import { EvaluarCualitativaService } from './evaluar-cualitativa.service';

describe('EvaluarCualitativaService', () => {
  let service: EvaluarCualitativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluarCualitativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

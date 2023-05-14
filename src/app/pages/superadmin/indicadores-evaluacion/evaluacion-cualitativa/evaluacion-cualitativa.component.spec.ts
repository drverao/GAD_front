import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCualitativaComponent } from './evaluacion-cualitativa.component';

describe('EvaluacionCualitativaComponent', () => {
  let component: EvaluacionCualitativaComponent;
  let fixture: ComponentFixture<EvaluacionCualitativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionCualitativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionCualitativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

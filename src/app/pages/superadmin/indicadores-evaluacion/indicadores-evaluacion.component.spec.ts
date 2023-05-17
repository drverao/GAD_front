import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresEvaluacionComponent } from './indicadores-evaluacion.component';

describe('IndicadoresEvaluacionComponent', () => {
  let component: IndicadoresEvaluacionComponent;
  let fixture: ComponentFixture<IndicadoresEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicadoresEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

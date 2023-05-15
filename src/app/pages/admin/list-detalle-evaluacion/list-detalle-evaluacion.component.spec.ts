import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetalleEvaluacionComponent } from './list-detalle-evaluacion.component';

describe('ListDetalleEvaluacionComponent', () => {
  let component: ListDetalleEvaluacionComponent;
  let fixture: ComponentFixture<ListDetalleEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetalleEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetalleEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

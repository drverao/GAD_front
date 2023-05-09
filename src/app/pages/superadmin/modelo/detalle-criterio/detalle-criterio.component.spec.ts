import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCriterioComponent } from './detalle-criterio.component';

describe('DetalleCriterioComponent', () => {
  let component: DetalleCriterioComponent;
  let fixture: ComponentFixture<DetalleCriterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCriterioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCriterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

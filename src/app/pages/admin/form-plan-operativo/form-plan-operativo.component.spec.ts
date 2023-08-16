import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanOperativoComponent } from './form-plan-operativo.component';

describe('FormPlanOperativoComponent', () => {
  let component: FormPlanOperativoComponent;
  let fixture: ComponentFixture<FormPlanOperativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlanOperativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasModeloComponent } from './fechas-modelo.component';

describe('FechasModeloComponent', () => {
  let component: FechasModeloComponent;
  let fixture: ComponentFixture<FechasModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechasModeloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FechasModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

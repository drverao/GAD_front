import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaUsuarioComponent } from './asigna-usuario.component';

describe('AsignaUsuarioComponent', () => {
  let component: AsignaUsuarioComponent;
  let fixture: ComponentFixture<AsignaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FenixComponent } from './fenix.component';

describe('FenixComponent', () => {
  let component: FenixComponent;
  let fixture: ComponentFixture<FenixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FenixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FenixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

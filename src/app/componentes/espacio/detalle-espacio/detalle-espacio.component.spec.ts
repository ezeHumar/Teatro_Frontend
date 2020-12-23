import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEspacioComponent } from './detalle-espacio.component';

describe('DetalleEspacioComponent', () => {
  let component: DetalleEspacioComponent;
  let fixture: ComponentFixture<DetalleEspacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEspacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

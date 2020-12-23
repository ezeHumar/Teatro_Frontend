import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEdicionComponent } from './detalle-edicion.component';

describe('DetalleEdicionComponent', () => {
  let component: DetalleEdicionComponent;
  let fixture: ComponentFixture<DetalleEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

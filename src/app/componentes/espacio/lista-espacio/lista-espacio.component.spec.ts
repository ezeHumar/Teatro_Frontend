import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspacioComponent } from './lista-espacio.component';

describe('ListaEspacioComponent', () => {
  let component: ListaEspacioComponent;
  let fixture: ComponentFixture<ListaEspacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEspacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

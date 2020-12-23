import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtistaComponent } from './lista-artista.component';

describe('ListaArtistaComponent', () => {
  let component: ListaArtistaComponent;
  let fixture: ComponentFixture<ListaArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEdicionComponent } from './lista-edicion.component';

describe('ListaEdicionComponent', () => {
  let component: ListaEdicionComponent;
  let fixture: ComponentFixture<ListaEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

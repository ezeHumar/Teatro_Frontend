import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaObraComponent } from './lista-obra.component';

describe('ListaObraComponent', () => {
  let component: ListaObraComponent;
  let fixture: ComponentFixture<ListaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

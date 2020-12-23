import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspacioComponent } from './editar-espacio.component';

describe('EditarEspacioComponent', () => {
  let component: EditarEspacioComponent;
  let fixture: ComponentFixture<EditarEspacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEspacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

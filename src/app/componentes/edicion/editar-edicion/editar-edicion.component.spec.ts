import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEdicionComponent } from './editar-edicion.component';

describe('EditarEdicionComponent', () => {
  let component: EditarEdicionComponent;
  let fixture: ComponentFixture<EditarEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

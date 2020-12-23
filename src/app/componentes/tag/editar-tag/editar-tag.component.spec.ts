import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTagComponent } from './editar-tag.component';

describe('EditarTagComponent', () => {
  let component: EditarTagComponent;
  let fixture: ComponentFixture<EditarTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

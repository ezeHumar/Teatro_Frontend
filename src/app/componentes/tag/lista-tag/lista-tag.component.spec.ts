import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTagComponent } from './lista-tag.component';

describe('ListaTagComponent', () => {
  let component: ListaTagComponent;
  let fixture: ComponentFixture<ListaTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

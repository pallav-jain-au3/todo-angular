import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTodoComponent } from './view-edit-todo.component';

describe('ViewEditTodoComponent', () => {
  let component: ViewEditTodoComponent;
  let fixture: ComponentFixture<ViewEditTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

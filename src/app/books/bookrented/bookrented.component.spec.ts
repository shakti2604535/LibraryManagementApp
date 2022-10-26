import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookrentedComponent } from './bookrented.component';

describe('BookrentedComponent', () => {
  let component: BookrentedComponent;
  let fixture: ComponentFixture<BookrentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookrentedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookrentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

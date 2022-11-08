import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateauthorbookComponent } from './createauthorbook.component';

describe('CreateauthorbookComponent', () => {
  let component: CreateauthorbookComponent;
  let fixture: ComponentFixture<CreateauthorbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateauthorbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateauthorbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

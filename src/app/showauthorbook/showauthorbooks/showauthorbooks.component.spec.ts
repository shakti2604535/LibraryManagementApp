import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowauthorbooksComponent } from './showauthorbooks.component';

describe('ShowauthorbooksComponent', () => {
  let component: ShowauthorbooksComponent;
  let fixture: ComponentFixture<ShowauthorbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowauthorbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowauthorbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

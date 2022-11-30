import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentbookComponent } from './rentbook.component';

describe('RentbookComponent', () => {
  let component: RentbookComponent;
  let fixture: ComponentFixture<RentbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthordetailsComponent } from './authordetails.component';

describe('AuthordetailsComponent', () => {
  let component: AuthordetailsComponent;
  let fixture: ComponentFixture<AuthordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthordetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

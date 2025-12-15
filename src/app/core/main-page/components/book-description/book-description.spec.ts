import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDescriptions } from './book-descriptions';

describe('BookDescription', () => {
  let component: BookDescriptions;
  let fixture: ComponentFixture<BookDescriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

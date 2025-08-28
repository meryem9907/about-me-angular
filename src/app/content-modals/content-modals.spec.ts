import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModals } from './content-modals';

describe('ContentModals', () => {
  let component: ContentModals;
  let fixture: ComponentFixture<ContentModals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

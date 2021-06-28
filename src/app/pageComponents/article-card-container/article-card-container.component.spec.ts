import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardContainerComponent } from './article-card-container.component';

describe('ArticleCardContainerComponent', () => {
  let component: ArticleCardContainerComponent;
  let fixture: ComponentFixture<ArticleCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

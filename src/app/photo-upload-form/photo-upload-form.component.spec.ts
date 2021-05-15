import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadFormComponent } from './photo-upload-form.component';

describe('PhotoUploadFormComponent', () => {
  let component: PhotoUploadFormComponent;
  let fixture: ComponentFixture<PhotoUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

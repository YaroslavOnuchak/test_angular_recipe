import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResipeEditComponent } from './resipe-edit.component';

describe('ResipeEditComponent', () => {
  let component: ResipeEditComponent;
  let fixture: ComponentFixture<ResipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResipeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

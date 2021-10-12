import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    }).compileComponents();
  })
  it('should create', () => {
    let fixture = TestBed.createComponent(UserComponent)
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })
});

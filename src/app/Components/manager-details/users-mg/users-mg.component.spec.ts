import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMgComponent } from './users-mg.component';

describe('UsersMgComponent', () => {
  let component: UsersMgComponent;
  let fixture: ComponentFixture<UsersMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMgComponent } from './profile-mg.component';

describe('ProfileMgComponent', () => {
  let component: ProfileMgComponent;
  let fixture: ComponentFixture<ProfileMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

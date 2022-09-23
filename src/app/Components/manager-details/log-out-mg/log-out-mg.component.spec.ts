import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutMgComponent } from './log-out-mg.component';

describe('LogOutMgComponent', () => {
  let component: LogOutMgComponent;
  let fixture: ComponentFixture<LogOutMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogOutMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOutMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

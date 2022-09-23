import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorInterfaceComponent } from './operator-interface.component';

describe('OperatorInterfaceComponent', () => {
  let component: OperatorInterfaceComponent;
  let fixture: ComponentFixture<OperatorInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

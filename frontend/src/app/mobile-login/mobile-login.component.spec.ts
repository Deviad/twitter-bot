import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLoginComponent } from 'src/app/mobile-login/mobile-login.component.tns';

describe('MobileLoginComponent', () => {
  let component: MobileLoginComponent;
  let fixture: ComponentFixture<MobileLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

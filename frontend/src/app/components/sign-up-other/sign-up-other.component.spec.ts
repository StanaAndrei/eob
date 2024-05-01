import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOtherComponent } from './sign-up-other.component';

describe('SignUpOtherComponent', () => {
  let component: SignUpOtherComponent;
  let fixture: ComponentFixture<SignUpOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpOtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

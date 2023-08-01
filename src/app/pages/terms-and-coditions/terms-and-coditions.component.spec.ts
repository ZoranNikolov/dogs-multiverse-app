import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndCoditionsComponent } from './terms-and-coditions.component';

describe('TermsAndCoditionsComponent', () => {
  let component: TermsAndCoditionsComponent;
  let fixture: ComponentFixture<TermsAndCoditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndCoditionsComponent]
    });
    fixture = TestBed.createComponent(TermsAndCoditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

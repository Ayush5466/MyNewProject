import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewticketComponent } from './createnewticket.component';

describe('CreatenewticketComponent', () => {
  let component: CreatenewticketComponent;
  let fixture: ComponentFixture<CreatenewticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewticketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

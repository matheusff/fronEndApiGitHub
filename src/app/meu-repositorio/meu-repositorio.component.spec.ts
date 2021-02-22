import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuRepositorioComponent } from './meu-repositorio.component';

describe('MeuRepositorioComponent', () => {
  let component: MeuRepositorioComponent;
  let fixture: ComponentFixture<MeuRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuRepositorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

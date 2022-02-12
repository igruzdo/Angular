import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatalogService } from '../services/catalog.service';
import { ButtonComponent } from './button.component';

describe('CatalogPageComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be newColor #1a05ff', () => {
    component.color = 'primary';
    expect(component.newColor).toBe('#1a05ff');
  });

  it('should be isLarge true', () => {
    component.size = 'large';
    expect(component.isLarge).toBe(true);
  });

  it('should be isDefault true', () => {
    component.size = 'default';
    expect(component.isDefault).toBe(true);
  });

  it('should be isSmall true', () => {
    component.size = 'small';
    expect(component.isSmall).toBe(true);
  });

  it('should be button inside', () => {
    const button = new DebugElement(component.input.nativeElement).name
    expect(button).toEqual('button');
  });

  it('should be text inside', () => {
    component.text = 'itIsButton';
    fixture.detectChanges()
    const buttonText = new DebugElement(component.input.nativeElement).nativeElement.textContent
    expect(buttonText).toEqual('itIsButton');
  });

  it('should be class default', () => {
    component.isDefault = true;
    const button = new DebugElement(component.input.nativeElement).classes
    expect(button).toEqual({default: true});
  });

  it('should be class active and default', () => {
    component.isActive = true;
    fixture.detectChanges()
    const button = new DebugElement(component.input.nativeElement).classes
    expect(button).toEqual({active:true, default: true});
  });

  it('should be class large', () => {
    component.isLarge = true;
    fixture.detectChanges()
    const button = new DebugElement(component.input.nativeElement).classes
    expect(button).toEqual({large:true, default: true});
  });
});

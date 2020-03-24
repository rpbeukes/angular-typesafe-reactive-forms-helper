import { TestBed, async } from '@angular/core/testing';
import { TestFormComponent } from './testform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
describe('TestFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent
      ],
      providers: [FormBuilderTypeSafe],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  }));

  it('should use typesafe getHeroNameByValue', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#getHeroNameByValue').textContent).toBe('Hi-Man');
  }));

  it('should use typesafe getHeroNameByGetSafe', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#getHeroNameByGetSafe').textContent).toBe('Hi-Man');
  }));

});

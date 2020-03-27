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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use typesafe getHeroNameByValue', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#getHeroNameByValue').textContent).toBe('He-Man');
  }));

  it('should use typesafe getHeroNameByGetSafe', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#getHeroNameByGetSafe').textContent).toBe('He-Man');
  }));

  it(`should have as title 'test-package-with-ng8'`, () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('test-package-with-ng8');
  });

});

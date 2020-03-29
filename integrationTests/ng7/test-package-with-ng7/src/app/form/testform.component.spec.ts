import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TestFormComponent } from './testform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent
      ],
      providers: [FormBuilderTypeSafe],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should use typesafe getHeroNameByValue', async(() => {
    expect(fixture.nativeElement.querySelector('#getHeroNameByValue').textContent).toBe('He-Man');
  }));

  it('should use typesafe getHeroNameByGetSafe', async(() => {
    expect(fixture.nativeElement.querySelector('#getHeroNameByGetSafe').textContent).toBe('He-Man');
  }));

  it(`should have as title 'test-package-with-ng7'`, () => {
    expect(component.title).toEqual('test-package-with-ng7');
  });

});

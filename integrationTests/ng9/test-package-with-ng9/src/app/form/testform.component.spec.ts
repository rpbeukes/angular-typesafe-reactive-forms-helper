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

  it(`should use setValue with typesafty`, () => {
    component.testForm.setValue({ heroName : 'Hulk', weapons: [
      {name: 'Fist', damagePoints: 80 }, /* strict so one has to add exactly 2 elements into the array  */
      {name: 'Head', damagePoints: 50 }
    ]}, { onlySelf: true, emitEvent: true });

    expect(component.testForm.value.heroName).toEqual('Hulk');
    expect(component.testForm.value.weapons[0].name).toEqual('Fist');
    expect(component.testForm.value.weapons[0].damagePoints).toEqual(80);
  });

  it('should use patchValue with typesafe and set partial value', () => {
    component.testForm.patchValue({ heroName: 'BabyHulk' });
    expect(component.testForm.value.heroName).toBe('BabyHulk');
    expect(component.testForm.value.weapons[0].name).toBe('Sword');
    expect(component.testForm.value.weapons[0].damagePoints).toBe(50);
    expect(component.testForm.value.weapons[1].name).toBe('Shield');
    expect(component.testForm.value.weapons[1].damagePoints).toBe(0);

    component.testForm.patchValue({ weapons: [{ name: 'Head' }]});
    expect(component.testForm.value.weapons[0].name).toBe('Head');
    expect(component.testForm.value.weapons[0].damagePoints).toBe(50);

    component.testForm.patchValue({ weapons: [{}, { damagePoints: 1 }]});
    expect(component.testForm.value.weapons[1].damagePoints).toBe(1);

    component.testForm.patchValue({ weapons: []});
    expect(component.testForm.value.weapons.length).toBe(2); // no change expected on the array
  });
});

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

  it(`should use typesafe controls`, () => {
    expect(component.testForm.controls.heroName.value).toBe('He-Man');
  });

  describe('valueChange', () => {
    beforeEach(() => {
      component.dataChangeRecorded = [];
      component.statusChangeRecorded = [];
    });

    it('should display changed heroName', async () => {
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('#hero-name-input');
      el.value = 'Spiderman';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // console.log('component.dataChangeRecorded', component.dataChangeRecorded.find(x => x.value === 'Spiderman'));
        const recordedValue = component.dataChangeRecorded.find((x) => x.scenario === 2);
        expect(recordedValue).toBeTruthy();
        expect(recordedValue.value).toBe('Spiderman');
        expect(component.dataChangeRecorded.find((x) => x.scenario === 1)).toBeTruthy();
      });
    });

    it('should display changed in weapons array but not specific array index change', async () => {
      fixture.detectChanges();
      expect(component.testForm.value.weapons[1].name).toBe('Shield');

      const el = fixture.nativeElement.querySelector('#weapon-name-1');
      el.value = 'Leg';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // console.log('component.dataChangeRecorded', JSON.stringify(component.dataChangeRecorded, null, 2));
        const recordedValue = component.dataChangeRecorded.find((x) => x.scenario === 3);
        expect(recordedValue).toBeTruthy();
        expect(component.testForm.value.weapons[1].name).toBe('Leg');
        // don't expect this to be recorded: 'valueChanges - weapons[0] => specific index in a array change'
        expect(component.dataChangeRecorded.find((x) => x.scenario === 4)).toBeFalsy();
        expect(component.dataChangeRecorded.find((x) => x.scenario === 1)).toBeTruthy();
      });
    });

    it('should display changed in weapons array and specific array index change', async () => {
      fixture.detectChanges();
      expect(component.testForm.value.weapons[0].name).toBe('Sword');

      const el = fixture.nativeElement.querySelector('#weapon-name-0');
      el.value = 'Leg';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // console.log('component.dataChangeRecorded', JSON.stringify(component.dataChangeRecorded, null, 2));
        const recordedValue = component.dataChangeRecorded.find((x) => x.scenario === 3);
        expect(recordedValue).toBeTruthy();
        expect(component.testForm.value.weapons[0].name).toBe('Leg');
        // 'valueChanges - weapons[0] => specific index in a array change'
        expect(component.dataChangeRecorded.find((x) => x.scenario === 4)).toBeTruthy();
        expect(component.dataChangeRecorded.find((x) => x.scenario === 1)).toBeTruthy();
      });
    });
  });

  describe('statusChange', () => {
    beforeEach(() => {
      component.statusChangeRecorded = [];
    });

    it('should record status changed when heroName empty', async () => {
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('#hero-name-input');
      el.value = '';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.statusChangeRecorded).toBeTruthy();
        expect(component.statusChangeRecorded.length > 0).toBe(true);
        expect(component.statusChangeRecorded).toEqual(['ControlChange - INVALID', 'FormChange - INVALID']);
        expect(component.testForm.status).toBe('INVALID');
        expect(component.testForm.getSafe((x) => x.heroName).status).toBe('INVALID');
      });
    });
  });

  it('should remove control', async(() => {
    expect(component.testForm.controls.heroName).toBeDefined();
    component.removeTestCode('heroName');
    expect(component.testForm.get('heroName')).toBe(null);

    expect(component.testForm.controls.weapons).toBeDefined();
    component.removeTestCode('weapons');
    expect(component.testForm.get('weapons')).toBe(null);
  }));
});

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { /*FormGroup, FormBuilder,*/ Validators, FormControl, FormArray } from '@angular/forms';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { AppComponent } from '../app.component';

interface WeaponModel {
  name: string;
  damagePoints: number;
}
interface HeroFormModel {
  heroName: string;
  weapons: WeaponModel[];
}

@Component({
  selector: 'app-test-form',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestFormComponent implements OnInit {
  title = new AppComponent().title;

  testForm: FormGroupTypeSafe<HeroFormModel>;
  @ViewChild('testFormTextArea', null) testFormTextArea: ElementRef;
  dataChangeRecorded: any[] = [];
  statusChangeRecorded: any[] = [];

  constructor(private fb: FormBuilderTypeSafe) { }

  ngOnInit(): void {
    this.testForm = this.fb.group<HeroFormModel>({
      heroName: new FormControl('He-Man', Validators.required),
      weapons: new FormArray([this.fb.group<WeaponModel>({
            name: new FormControl('Sword', Validators.required),
            damagePoints: new FormControl(50, Validators.required)
        }),
        this.fb.group<WeaponModel>({
            name: new FormControl('Shield', Validators.required),
            damagePoints: new FormControl(0, Validators.required)
        }),
      ])
    });

    this.onValueChanges();
    this.onStatusChanges();
  }

  getHeroNameByValue = () => this.testForm.value.heroName;
  getHeroNameByGetSafe = () => this.testForm.getSafe(x => x.heroName).value;

  get weapons() {
    return this.testForm.getSafe(x => x.weapons) as FormArray;
  }

  get weaponControls() {
    return (this.testForm.getSafe(x => x.weapons) as FormArray).controls;
  }

  public removeTestCode(controlName: keyof HeroFormModel) {
    if (controlName === 'heroName') {
      this.testForm.removeControlSafe(x => x.heroName);
    } else {
      this.testForm.removeControlSafe(x => x.weapons);
    }
  }

  private onValueChanges() {
    // valueChanges - testForm value => HeroFormModel change
    this.testForm.valueChanges.subscribe(value => {
      this.testFormTextArea.nativeElement.value = JSON.stringify(value, null, 2);
      this.dataChangeRecorded.push({ value, scenario: 1, message: 'valueChanges - testForm value => HeroFormModel change' });
    });
    // valueChanges - heroName => string change
    this.testForm.getSafe(x => x.heroName).valueChanges.subscribe(value => {
      this.dataChangeRecorded.push({ value, scenario: 2, message: 'valueChanges - heroName => string change' });
    });
    // valueChanges - weapons => array change
    this.testForm.getSafe(x => x.weapons).valueChanges.subscribe(value => {
      this.dataChangeRecorded.push({ value, scenario: 3, message: 'valueChanges - weapons => array change' });
    });
    // valueChanges - weapons[0] => specific index in a array change
    this.testForm.getSafe(x => x.weapons).get([0]).valueChanges.subscribe(value => {
      this.dataChangeRecorded.push({ value, scenario: 4, message: 'valueChanges - weapons[0] => specific index in a array change' });
    });
  }

  private onStatusChanges() {
    // control status change (monitor specific control change)
    this.testForm.getSafe(x => x.heroName).statusChanges.subscribe(value => {
      this.statusChangeRecorded.push(`ControlChange - ${value}`);
    });

    // form status change (monitor global change)
    this.testForm.statusChanges.subscribe(value => {
      this.statusChangeRecorded.push(`FormChange - ${value}`);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { /*FormGroup, FormBuilder,*/ Validators, FormControl, FormArray } from '@angular/forms';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';

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
  title = 'test-package-with-ng8';

  testForm: FormGroupTypeSafe<HeroFormModel>;

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
  }

  getHeroNameByValue = () => this.testForm.value.heroName;
  getHeroNameByGetSafe = () => this.testForm.getSafe(x => x.heroName).value;

  get weapons() {
    return this.testForm.getSafe(x => x.weapons) as FormArray;
  }

  get weaponControls() {
    return (this.testForm.getSafe(x => x.weapons) as FormArray).controls;
  }
}

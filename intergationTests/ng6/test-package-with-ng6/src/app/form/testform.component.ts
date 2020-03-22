import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestFormComponent implements OnInit {
  title = 'test-package-with-ng6';

  testForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.testForm = this.fb.group({
      heroName: new FormControl('Hi-Man', Validators.required),
    });

    console.log(this.testForm);
    console.log(this.testForm.value);
  }

  getHeroName = () => this.testForm.value.heroName;
  
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestFormComponent } from './form/testform.component';


const routes: Routes = [
  { path: '', component: TestFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

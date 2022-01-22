import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateEditViewComponent } from './rate-edit-view/rate-edit-view.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RateEditViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RateModule { }

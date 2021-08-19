import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { Routes,RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SubHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[SubHeaderComponent]
})
export class SubHeaderModule { }

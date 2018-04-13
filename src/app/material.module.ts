import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule  
  ],
  declarations: []
})
export class MaterialModule { }

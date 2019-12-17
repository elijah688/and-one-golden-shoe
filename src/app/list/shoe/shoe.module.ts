import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ShoeComponent } from './shoe.component';


@NgModule({
  imports:[ 
    CommonModule,
    IonicModule
  ],
  exports:[ShoeComponent],
  declarations: [ShoeComponent]
})
export class ShoeModule {}

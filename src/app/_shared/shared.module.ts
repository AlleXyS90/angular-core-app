import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
library.add(fab, fas, far);

import {MaterialModule} from './material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})

export class SharedModule {
}

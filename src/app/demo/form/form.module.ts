import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from '../../shared';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule,
        MatCheckboxModule
    ],
    declarations: [FormComponent]
})
export class FormModule {}

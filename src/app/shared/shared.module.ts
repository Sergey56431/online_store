import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RepeatPasswordDirective} from "./direcives/repeat-password.directive";
import { ProductCardComponent } from './components/product-card/product-card.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [RepeatPasswordDirective, ProductCardComponent, CategoryFilterComponent, CountSelectorComponent, LoaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatProgressSpinnerModule,
        FormsModule
    ],
    exports: [RepeatPasswordDirective, ProductCardComponent, CategoryFilterComponent, CountSelectorComponent, LoaderComponent],
})
export class SharedModule { }

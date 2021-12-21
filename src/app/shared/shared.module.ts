import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { ErrorModalComponent } from "./error-modal/error-modal.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        ErrorModalComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        ErrorModalComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ]
})
export class SharedModule {

}
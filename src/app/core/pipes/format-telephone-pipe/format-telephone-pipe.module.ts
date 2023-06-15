import { NgModule } from '@angular/core';
import { FormatTelephonePipe } from './format-telephone-pipe.pipe';

@NgModule({
    declarations: [
        FormatTelephonePipe
    ],
    exports     : [
        FormatTelephonePipe
    ]
})
export class FormatTelephonePipeModule
{
}
